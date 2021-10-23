import { each } from './utils'
import { rma } from './rma'

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
        target.addEventListener(...args)
        this._listeners.push(() => target.removeEventListener(...args))
    }
}

export class AccessStore extends Store {
    add (callback: (event: any) => void) {
        const update = () => callback(rma.event)
        this._listeners.push(() => rma.cancel(update))
        rma(update)
    }
}
