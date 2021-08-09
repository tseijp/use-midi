import { Controller } from './Controller'
import  {
    GestureKey
} from './types'

// export interface BaseEngine {
//     init?(): void
//     setup?(): void
//     intent?(): void
// }

export class BaseEngine<Key extends GestureKey> {
    readonly _ctrl: Controller
    readonly _args: any[]
    readonly _key: Key

    constructor (ctrl: Controller, args: any, key: Key) {
        this._ctrl = ctrl
        this._args = args
        this._key = key

        if (!this.state) {
            this.state = {
                values: [0, 0],
                initial: [0, 0]
            } as any
        }
        if (this.init) this.init()
        if (this.reset) this.reset()
    }

    get state () {
        return this._ctrl.state[this._key]!
    }

    set state (state: any) {
        this._ctrl.state[this._key] = state
    }

    get shared () {
        return this._ctrl.state.shared
    }

    get eventStore () {
        return this._ctrl.gestureEventStores[this._key]!
    }

    get timeoutStore () {
        return this._ctrl.gestureTimeoutStore[this._key]!
    }

    get handler () {
        return this._ctrl.handlers[this._key]!
    }

    init () {
        this.reset()
    }

    reset () {
        const { state, shared, config, _args } = this
        // state.xxx = [0, 0]
    }

    start (event: any) {
        const {state, config} = this
        // state.xxx = event.xxx
    }

    compute (event?: any) {
        const { state, config, shared } = this
        // state.xxx = event.xxx
    }

    emit () {
        const { state, shard, config } = this
    }

    clean () {
        this.eventStore.clean()
        this.timeoutStore.clean()
    }
}
