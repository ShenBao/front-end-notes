
function isListener(listener) {
    if (typeof listener === 'function') {
        return true
    }
    return false;
}


const pureObject = Object.create(null);

/**
 * 
 * 忽略，就是一个事件广播，后续会去除
 * @export
 * @class EventEmitter
 */
export default class EventEmitter {

    #events = pureObject;

    #addListener(event, listener, once) {
        if (!event || !listener) return false;

        if (!isListener(listener)) {
            throw new TypeError('listener must be a function');
        }
        const listeners = (this.#events[event] = this.#events[event] || []);
        listeners.push({
            listener,
            once
        });

        return true;
    }

    #removeListener(event, listener) {
        const listeners = this.#events[event];
        if (!listeners) return false;

        const index = listeners.findIndex(l => l.listener === listener);

        // 如果不是 -1， ~-1 =  -(-1 + 1) = 0
        if (~index) {
            listeners.splice(index, 1);
            return true;
        }
        return false;
    }

    on(event, listener) {
        this.#addListener(event, listener, false);
        return this;
    };

    once(event, listener) {
        this.#addListener(event, listener, true);
        return this;
    };

    off(event, listener) {
        this.#removeListener(event, listener);
        return this;
    };

    offAll(eventName) {
        if (eventName && this.#events[eventName]) {
            this.#events[eventName] = []
        } else {
            this.#events = pureObject
        }
        return this;
    };

    emit(event, ...args) {
        const listeners = this.#events[event];
        if (!listeners) return;

        // 倒叙遍历，不，我就不
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            if (!listener) {
                continue;
            }
            listener.listener.apply(this, args);
            // TODO??
            if (listener.once && this.#removeListener(event, listener.listener)) {
                i--;
            }
        }
        return this;
    };
}