import { Controller } from '../Controller'
import { toDomEventType } from '../utils'

export interface EventStore {

}

export class EventStore {
    private _ctrl: Controller
    private _listeners: (() => void)[] = []

    constructor(ctrl: Controller) {
        this._ctrl = ctrl
    }

    add(
        element: EventTarget,
        device: string,
        action: string,
        handler: (event: any) => void,
        options?: AddEventListenerOptions
    ) {
        const type = toDomEventType(device, action)
        const eventOptions = { ...this._ctrl.config.shared.eventOptions, ...options }
        element.addEventListener(type, handler, eventOptions)
        this._listeners.push(() =>
            element.removeEventListener(type, handler, eventOptions)
        )
    }

    clean() {
        this._listeners.forEach((remove) => remove())
        this._listeners = []
    }
}
