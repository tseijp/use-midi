import { EventStore } from './EventStore'
import { TimeoutStore } from './TimeoutStore'
import {
    GestureKey
} from './types'

export class Controller {
    public gestures = new Set<GestureKey>()
    private _targetEventStore = new EventStore(this)
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
        return () => this._targetEventStore.clean()
    }

    bind (...args: any) {}
}
