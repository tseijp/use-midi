import { Controller } from '../Controller'
import  {
    MidiKey
} from '../types'

// export interface BaseEngine {
//     init?(): void
//     setup?(): void
//     intent?(): void
// }

export abstract class BaseEngine<Key extends MidiKey> {
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

    abstract bind (...args: any): any

    // shorthands
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
        return this._ctrl.eventStores[this._key]!
    }

    get timeoutStore () {
        return this._ctrl.timeoutStores[this._key]!
    }

    get engine () {
        return this._ctrl.engines[this._key]!
    }

    get config () {
        return this._ctrl.config
    }

    init () {
        this.reset()
    }

    reset () {
        const { state, shared, config, _args } = this
        state.values = []
    }

    start (event: any) { // MIDIStateChagneEvent
        const {state, config} = this
        if (!state._active) {
            this.reset()
            state._active = true
            state.target = event.target
            state.initial = state.values
        }
        state.startTime = state.timeStamp = event.timeStamp
    }

    compute (event: any) {
        const {state, config} = this
        if (event) {
            state
            state.event = event
        }
    }

    emit () {
        const { state, shared, config } = this
    }

    clean () {
        this.eventStore.clean()
        this.timeoutStore.clean()
    }
}
