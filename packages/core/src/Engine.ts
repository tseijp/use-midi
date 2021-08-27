import { Controller } from './Controller'
import  { MidiKey } from './types'

// export interface Engine {
//     init?(): void
//     setup?(): void
//     intent?(): void
// }

export interface Engine<Key extends MidiKey> {
    /**
     * initiarize engine
     */
    __init__?(): void

    /**
     * compute at a specific time
     */
    __first__?(): void
    __change__?(): void
    __last__?(): void
}

export abstract class Engine<Key extends MidiKey> {
    readonly _ctrl: Controller
    readonly _args: any[]
    readonly _key: Key

    /**
     * shorthands of ctrl value
     */
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

    get accessStore () {
        return this._ctrl.accessStores[this._key]!
    }

    get config () {
        return this._ctrl.config
    }

    constructor (ctrl: Controller, args: any, key: Key) {
        this._ctrl = ctrl
        this._args = args
        this._key = key

        if (!this.state) {
            this.state = {
                data: [0, 0, 0],
                init: [0, 0, 0]
            }
        }
        this.__init__?.()
        this.reset()
    }

    /**
     * event listeners are properly set by the  Controller.
     */
    abstract bind (
        bindFn: (
            device: string,
            action: string,
            prop: (event: any) => void,
            // opts?: AddEventListenerOptions
            isNative?: boolean
        ) => void
    ): any

    /**
     * reset state if init run
     */
    reset () {
        const { state, shared, _key, _args } = this
        shared[_key] = false
        state.active = false
        state.blocked = false
        state.first = true
        state.axis = undefined
        state.memo = undefined
        state.deltaTime = 0
        state.timeStamp = 0
        state.elapsedTime = 0
        state.delta = [0, 0, 0]
        state.direction = [0, 0, 0]
        state.velocity = 0
        state.movement = 0
        state.command = 0
        state.channel = 0
        state.noteNum = 0
        state.distance = 0
        state.velocity = 0
        state.args = _args
    }

    /**
     * start of the midi access
     * event: MIDIStateChagneEvent
     */
    start (event: any) {
        const { state } = this
        if (!state.active) {
            this.reset()
            state.active = true
            state.first = false
            state.target = event.target
            state.init = state.data = event.data
        }
        state.startTime = state.timeStamp = event.timeStamp
    }

    /**
     * calculate midi event data
     * event: MIDIStateChagneEvent || MIDIMessageEvent
     */
    compute (event: any) {
        const { state, shared, _key } = this
        if (!state.active || state.blocked) return
        state.args = this._args
        state.first = state.active && !state.active
        state.last = !state.active && state.active
        shared[_key] = state.active

        /**
         * calclate event on all event handlers
         */
        if (!event) return
        if (state.first) this.__first__?.()
        else if (state.last) this.__last__?.()
        else this.__change__?.()
        state.target = event.target
        state.event = event
        state.type = event.type
        state.send = event.send || (() => {})
        state.deltaTime = event.timeStamp - state.timeStamp
        state.timeStamp = event.timeStamp
        state.elapsedTime = state.timeStamp - state.startTime

        /**
         * calculate data on MIDI message event
         */
        if (!event.data) return
        const [_m0, _m1, _m2] = state.movement
        const [_p0, _p1, _p2] = state.data
        const [_c0, _c1, _c2] = event.data
        state.data = [_c0, _c1, _c2]
        state.prev = [_p0, _p1, _p2]
        state.delta = [_c0 - _p0, _c1 - _p1, _c2 - _p2]
        state.sign = state.delta.map(Math.sign)
        state.command = _c0 >> 4
        state.channel = _c0 & 0xf
        state.noteNum = _c1
        state.distance += state.delta[0]
        state.velocity = _c2? _c2 / 127: state.delta[0] / state.deltaTime
    }
    /**
     * Fires the midi handler.
     */
    emit () {
        const { state } = this
        if (!state._active) this.clean()
    }

    /**
     * Cleans store when controller did unmount
     */
    clean () {
        this.eventStore.clean()
        this.accessStore.clean()
    }
}
