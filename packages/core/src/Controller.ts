import { GestureKey } from './types'
import { EventStore, TimeoutStore } from './stores'

export class Controller {
    public gestures = new Set<GestureKey>()
    private _eventStore = new EventStore(this)
    private _timeoutStore = new TimeoutStore(this)
    public gestureEventStores: { [key in GestureKey]?: EventStore } = {}
    public gestureTimeoutStores: { [key in GestureKey]?: TimeoutStore } = {}
    public ahandlers = {}
    public config = {} as any
    public state = {
        shared: {}
    } as any

    constructor () {}

    clean () {
        for (const key of this.gestures) {
            this.gestureEventStores[key]!.clean()
            this.gestureTimeoutStores[key]!.clean()
        }
    }

    effect () {
        if (this.config.shared.target) this.bind()
        return () => void (this._eventStore.clean(), this._timeoutStore.clean())
    }

    bind (...args: any) {}
}
