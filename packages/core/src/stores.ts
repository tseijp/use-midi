import { each } from './utils'
import { rma } from './rma'

type Fun = (...args: any) => void
const TargetError = "Error: Event target of undefined (reading 'addEventListener')"

export class Store {
    _listeners: (() => void)[] = []

    clean () {
        each(this._listeners, fn => fn())
        this._listeners = []
    }
}

export class EventStore extends Store {
    add (target: EventTarget, type: string, prop: any, opts?: any): void
    add (target: any, ...args: any[]) {
        if (!target) return console.warn(TargetError)
        target.addEventListener(...args)
        this._listeners.push(() => target.removeEventListener(...args))
    }
}

export class AccessStore extends Store {
    add (callback: Fun) {
        const update = () => callback(rma.event)
        this._listeners.push(() => rma.cancel(update))
        rma(update)
    }
}

export class TimeoutStore extends Store {
    add(callback: Fun, ms=140, ...args: any[]) {
        const timeout = window.setTimeout(callback, ms, ...args)
        this._listeners.push(() => window.clearTimeout(timeout))
    }
}
