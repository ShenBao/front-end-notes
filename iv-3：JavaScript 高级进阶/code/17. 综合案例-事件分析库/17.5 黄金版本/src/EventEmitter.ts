import { EventEmitterItem } from "./types";

function isListener(listener: unknown): boolean {
    if (typeof listener === 'function') {
        return true
    }
    return false;
}


const pureObject = Object.create(null);

export default class EventEmitter {

    #events: Record<string, EventEmitterItem[]> = pureObject;

    #addListener(event: string, listener: Function, once: boolean) {
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

    #removeListener(event: string, listener: Function) {
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

    on(event: string, listener: Function) {
        this.#addListener(event, listener, false);
        return this;
    };

    once(event: string, listener: Function) {
        this.#addListener(event, listener, true);
        return this;
    };

    off(event: string, listener: Function) {
        this.#removeListener(event, listener);
        return this;
    };

    offAll(event: string) {
        if (event && this.#events[event]) {
            this.#events[event] = []
        } else {
            this.#events = pureObject
        }
        return this;
    };

    emit(event: string, ...args: any[]) {
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