import { Controller } from './Controller'
import  {
    MIDIKey
} from './types'

// export interface BaseEngine {
//     init?(): void
//     setup?(): void
//     intent?(): void
// }

export class BaseEngine<Key extends MIDIKey> {
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
        return this._ctrl.timeoutStore[this._key]!
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
        // state.xxx = [0, 0]
    }

    start (event: any) {
        const {state, config} = this
        // state.xxx = event.xxx
    }

    emit () {
        const { state, shard, config } = this
    }

    clean () {
        this.eventStore.clean()
        this.timeoutStore.clean()
    }

    change () {}

    input (access) {

    }

    output () {

    }
}
