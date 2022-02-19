import { rma, Any } from './rma'
import { each } from './utils'

export class Store {
    _listeners: (() => void)[] = []
    clean () {
        each(this._listeners, fn => fn())
        this._listeners = []
    }
}

type EventListenerArgs = [
    type: string,
    prop: {(e: Event): void} | EventListenerObject | null,
    opts?: AddEventListenerOptions | boolean | undefined
]

const WARN_NO_TARGET = "Error: Event target of undefined (reading 'addEventListener')"

export class EventStore extends Store {
    add (target: EventTarget, ...args: EventListenerArgs) {
        if (!target) return console.warn(WARN_NO_TARGET)
        target.addEventListener(...args)
        this._listeners.push(() => target.removeEventListener(...args))
    }
}

export class AccessStore extends Store {
    add (callback: (event?: Any) => void) {
        const update = () => callback(rma.event)
        this._listeners.push(() => rma.cancel(update))
        rma(update)
    }
}
