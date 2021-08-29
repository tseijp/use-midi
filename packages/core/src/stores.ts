import { each } from './utils'
import { rma } from './rma'

export class EventStore {
    private _listeners: (() => void)[] = []

    add (target: EventTarget, type: string, prop: any, opts?: any): void

    add (target: any, ...args: any[]) {
        target.addEventListener(...args)
        this._listeners.push(() => target.removeEventListener(...args))
    }

    clean () {
        each(this._listeners, fn => fn())
        this._listeners = []
    }
}

export class AccessStore {
    private _listeners: (() => void)[] = []

    add (callback: (event: any) => void) {
        const update = () => callback(rma.event)
        this._listeners.push(() => rma.cancel(update))
        rma(update)
    }

    clean () {
        each(this._listeners, fn => fn())
        this._listeners = []
    }
}

export class TimeoutStore {
    private _timeouts = new Map<string, number>()

    add (key: string, callback: any, ms = 140, ...args: Parameters<any>) {
        this.remove(key)
        this._timeouts.set(key, window.setTimeout(callback, ms, ...args))
    }

    remove (key: string) {
        const timeout = this._timeouts.get(key)
        if (timeout) window.clearTimeout(timeout)
    }

    clean () {
        each(this._timeouts, timeout => void window.clearTimeout(timeout))
        this._timeouts.clear()
    }
}
