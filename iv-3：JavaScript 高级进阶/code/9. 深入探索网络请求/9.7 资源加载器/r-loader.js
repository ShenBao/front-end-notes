
class Emitter {
    constructor() {
        this._events = Object.create(null);
    }
    emit(type, ...args) {
        const events = this._events[type];
        if (!Array.isArray(events) || events.length === 0) {
            return;
        }
        events.forEach(event => event.apply(null, args));
    }

    on(type, fn) {
        const events = this._events[type] || (this._events[type] = []);
        events.push(fn)
    }

    off(type, fn) {
        const events = this._events[type] || (this._events[type] = []);
        const index = events.find(f => f === fn);
        if (index < -1) {
            return;
        }
        events.splice(index, 1);
    }
}


class CacheManager {
    constructor(storage) {
        this.storage = storage;
        this._cached = Object.create(null);
    }
    load(keys) {
        const cached = this._cached;
        return this.storage.getMany(keys).then(results => {
            results.forEach((value, index) => {
                if (value !== undefined) {
                    cached[keys[index]] = value;
                }
            });
            return cached;
        })
    }
    get data() {
        return this._cached;
    }
    get(key) {
        return this._cached[key]
    }
    isCached(key) {
        return this._cached[key] != undefined;
    }
    set(key, value) {
        return this.storage.set(key, value);
    }
    clear() {
        this._cached = Object.create(null);
        // return this.storage.clear();
    }
    del(key) {
        delete this._cached[key];
    }
}


const defaultStorage = {
    get: noop,
    getMany: noop,
    set: noop,
    del: noop,
    clear: noop
};

// status: undefined loading loaded error
class ResourceLoader extends Emitter {
    constructor(resourcesInfo, storage = defaultStorage) {
        super();
        this._originResourcesInfo = resourcesInfo;
        this._cacheManager = new CacheManager(storage);
        this.reset();
    }

    reset() {
        const resourcesInfo = this._originResourcesInfo;
        this.resourcesInfo = resourcesInfo.map(r => cloneObject(r));
        this.resourcesInfoObj = resourcesInfo.reduce((obj, cur) => {
            obj[cur.key] = cur;
            return obj;
        }, {});
        // 已缓存， 缓存不等已加载，只有调用URL.createObjectURL之后，才会变为loaded
        this._loaded = Object.create(null);
        this._cacheManager.clear();
    }

    isCompleted() {
        return this.resourcesInfo.every(r => r.status === "loaded" || r.status === "error");
    }

    onResourceLoaded = (info, data, isCached) => {
        console.log(`${info.key} is loaded`);
        const rInfo = this.resourcesInfo.find(r => r.key === info.key);
        rInfo.status = "loaded";

        this._loaded[rInfo.key] = {
            key: rInfo.key,
            url: generateBlobUrl(data)
        };

        this.emit("progress", this.getProgress(), rInfo);
        if (!isCached) {
            const info = {
                data,
                key: rInfo.key,
                url: rInfo.url,
                ver: rInfo.ver || ""
            };
            this._cacheManager.set(info.key, info);
        }
        this.loadNext();
    }

    loadNext() {
        if (!this.isCompleted()) {
            return this.fetchResources()
        }
        this.emit("completed", this._loaded);
        // 全部正常加载，才触发loaded事件
        if (this.resourcesInfo.every(r => r.status === "loaded")) {
            this.emit("loaded", this._loaded);
        }
    }

    getProgress() {
        const total = this.resourcesInfo.length;
        const loaded = Object.keys(this._loaded).length;
        return {
            total,
            loaded,
            percent: total === 0 ? 0 : + ((loaded / total) * 100).toFixed(2)
        }
    }

    get(key) {
        return (this._loaded[key] || this.resourcesInfoObj[key]).url;
    }

    getCacheData(key) {
        return this._cacheManager.get(key)
    }

    fetchResource(rInfo) {
        const verStr = rInfo.ver ? `?ver=${rInfo.ver}` : '';
        return fetchResource(`${rInfo.url}${verStr}`)
            .then(blob => this.onResourceLoaded(rInfo, blob))
            .catch(error => this.onResourceLoadError(error, rInfo));
    }

    onResourceLoadError(err, info) {
        const rInfo = this.resourcesInfo.find(r => r.key === info.key);
        rInfo.status = "error";

        console.error(`${info.key}(${info.url}) load error: ${err.message}`);
        this.emit("error", err, info);

        // 因被依赖，会导致其他依赖他的资源为失败
        this.setFactorErrors(info);
        this.loadNext();
    }

    setFactorErrors(info) {
        // 未开始，pre包含info.key
        const rs = this.resourcesInfo.filter(r => !r.status && r.pre && r.pre.indexOf(info.key) >= 0);
        if (rs.length < 0) {
            return;
        }
        rs.forEach(r => {
            console.warn(`mark ${r.key}(${r.url}) as error because it's pre failed to load`);
            r.status = "error"
        });
    }

    isPreLoaded(pre) {
        const preArray = Array.isArray(pre) ? pre : [pre]
        return preArray.every(p => this._loaded[p] !== undefined);
    }

    findCanLoadResource() {
        const info = this.resourcesInfo.find(r => r.status == undefined && (r.pre == undefined || this.isPreLoaded(r.pre)));
        return info;
    }

    fetchResources() {
        let info = this.findCanLoadResource();
        while (info) {
            const cache = this._cacheManager.get(info.key);

            // 有缓存
            if (cache) {
                const isOlder = compareVersion(cache.ver, info.ver || "") < 0;

                // 缓存过期
                if (isOlder) {
                    console.warn(`${info.key} is cached, but is older version, cache:${cache.ver} request: ${info.ver}`);
                } else {
                    console.log(`${info.key} is cached, load from db, pre`, info.pre);
                    this.onResourceLoaded(info, cache.data, true);
                    info = this.findCanLoadResource();
                    continue;
                }
            }
            console.log(`${info.key} load from network ${info.url}, pre`, info.pre);
            info.status = "loading";
            this.fetchResource(info);
            info = this.findCanLoadResource();
        }
    }

    prepare() {
        const keys = this.resourcesInfo.map(r => r.key);
        return this._cacheManager.load(keys);
    }

    startLoad() {
        const failed = validateKey(this.resourcesInfo);
        if (failed) {
            return;
        }
        if (this.isCompleted()) {
            return this.emit("completed", this._cacheManager.data);
        }
        this.prepare()
            .then(() => this.fetchResources())
            .catch(err => this.emit("error", err));
    }
}



