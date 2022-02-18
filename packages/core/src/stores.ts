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
  prop: EventListenerOrEventListenerObject | null,
  opts?: AddEventListenerOptions | boolean | undefined
]

export class EventStore extends Store {
    add (target: EventTarget, ...args: any[]) {
        if (!target) return console.warn("Error: Event target of undefined (reading 'addEventListener')")
        target.addEventListener(...args as EventListenerArgs)
        this._listeners.push(() => target.removeEventListener(...args as EventListenerArgs))
    }
}

export class AccessStore extends Store {
    add (callback: (event?: Any) => void) {
        const update = () => callback(rma.event)
        this._listeners.push(() => rma.cancel(update))
        rma(update)
    }
}
