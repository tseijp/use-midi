import { rma } from './utils'
import { Controller } from './Controller'

export class AccessStore {
    private _controller: Controller
    private _listeners: (() => void)[] = []

    constructor (controller: Controller) {
        this._controller = controller
    }

    add (key: string, callback: (ts: number|undefined) => void) {
        rma(callback)
        this._listeners.push(() => rma.cancel(callback))
    }

    clean () {
        this._listeners.forEach(remove => remove())
        this._listeners = []
    }
}

export class EventStore {
    private _controller: Controller
    private _listeners: (() => void)[] = []

    constructor(ctrl: Controller) {
        this._controller = ctrl
    }

    //element: EventTarget, device: string, action: string, handler: (event: any) => void, options?: AddEventListenerOptions
    add (element: EventTarget) {
        // element.addEventListener
        // const eventOptions = { ...this._controller.config.shared.eventOptions, ...options }
        // element.addEventListener(type, handler, eventOptions)
        // this._listeners.push(() =>
        //     element.removeEventListener(type, handler, eventOptions)
        // )
        this._listeners.push()
    }

    clean() {
        this._listeners.forEach((remove) => remove())
        this._listeners = []
    }
}

// export class TimeoutStore {
//     private _controller: Controller
//     private _timeouts = new Map<string, number>()
//
//     constructor(ctrl: Controller) {
//         this._controller = ctrl
//     }
//
//     add (key: string, callback: any, ms = 140, ...args: Parameters<any>) {
//         this.remove(key)
//         this._timeouts.set(key, window.setTimeout(callback, ms, ...args))
//     }
//
//     remove(key: string) {
//         const timeout = this._timeouts.get(key)
//         if (timeout) window.clearTimeout(timeout)
//     }
//
//     clean() {
//         this._timeouts.forEach((timeout) => void window.clearTimeout(timeout))
//         this._timeouts.clear()
//     }
// }
