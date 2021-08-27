import { rma } from './utils'

export class EventStore {
    private _listeners: (() => void)[] = []

    add (target: EventTarget, type: string, prop: any, opts?: any): void

    add (target: any, ...args: any[]) {
        target.addEventListener(...args)
        this._listeners.push(() => target.removeEventListener(...args))
    }

    clean() {
        this._listeners.forEach(remove => remove())
        this._listeners = []
    }
}

export class AccessStore {
    private _access = new Map<string, any>()

    add (key: string, callback: (ts: number|undefined) => void) {
        rma(callback)
        this._access.set(key, callback)
    }

    clean () {
        this._access.forEach(callback => void rma.cancel(callback))
        this._access.clear()
    }
}

export class TimeoutStore {
    private _timeouts = new Map<string, number>()

    add (key: string, callback: any, ms = 140, ...args: Parameters<any>) {
        this.remove(key)
        this._timeouts.set(key, window.setTimeout(callback, ms, ...args))
    }

    remove(key: string) {
        const timeout = this._timeouts.get(key)
        if (timeout) window.clearTimeout(timeout)
    }

    clean() {
        this._timeouts.forEach((timeout) => void window.clearTimeout(timeout))
        this._timeouts.clear()
    }
}
