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
        engine: (event: any) => void,
        options?: AddEventListenerOptions
    ) {
        const type = toDomEventType(device, action)
        const eventOptions = { ...this._ctrl.config.shared.eventOptions, ...options }
        element.addEventListener(type, engine, eventOptions)
        this._listeners.push(() =>
            element.removeEventListener(type, engine, eventOptions)
        )
    }

    clean() {
        this._listeners.forEach((remove) => remove())
        this._listeners = []
    }
}
