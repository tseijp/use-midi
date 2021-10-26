import { each } from './utils'
import { MidiKey, IngKey } from './types'
import { Controller } from './Controller'

const { abs, sign } = Math

export interface Engine<Key extends MidiKey> {
    /**
     * initiarize engine
     */
    __init__?(): void

    /**
     * compute at a specific time
     */
    __start__?(): void
    __change__?(): void
    __end__?(): void
}

export abstract class Engine<Key extends MidiKey> {
    readonly _ctrl: Controller
    readonly _args: any[]
    readonly _key: Key
    abstract readonly _ingKey: IngKey

    constructor (ctrl: Controller, args: any, key: Key) {
        this._ctrl = ctrl
        this._args = args
        this._key = key

        if (!this.state) {
            this.state = {data: [0, 0, 0]}
            this.__init__?.()
            this.reset()
        }
    }

    /**
     * event listeners are properly set by the  Controller.
     */
    abstract bind (
        bindFn: (
            device: string,
            action: string,
            prop: (event: any) => void,
            isNative?: boolean
        ) => void
    ): any

    /**
     * reset state if init run
     */
    reset () {
        const { state: $, config, _args } = this
        $.deltaTime = $.timeStamp = $.elapsedTime = 0
        $._value = $._delta = $._offset = $._distance = $._movement = 0
        $._active = $.active = $.blocked = $.force = false
        $.velocity = $.command = $.channel = $.note = $.axis = $.memo = void 0
        $.threshold = abs(config.shared.threshold || 1) // TODO transform
        resetMap(this.state, 'value', 'delta', 'offset', 'distance', 'movement')
        // $.offset = $._offset = config.from || $._offset // TODO ? call(config.from)
        $.first = true
        $.args = _args
        $.step = -1
    }

    /**
     * start of the midi access
     * event: MIDIStateChagneEvent
     */
    start (event?: any) {
        const { state: $, } = this
        if (!$._active) {
            this.reset()
            $._active = true
            $.first = false
            // shared[_ingKey] = false
            $.target = event.target!
        }
        $.startTime = $.timeStamp = event.timeStamp
    }

    /**
     * calculate midi event data
     * event: MIDIStateChagneEvent || MIDIMessageEvent
     */
    compute (event?: any) {
        const { state: $, shared, _ingKey } = this
        if (!$._active || $.blocked) return
        $.args = this._args

        /**
         * calclate event on all event handlers
         */
        if (event) {
            $.target = event.target
            $.event = event
            $.type = event.type
            $._deltaTime = event.timeStamp - $.timeStamp
            $.timeStamp = event.timeStamp
            $.elapsedTime = $.timeStamp - $.startTime
            // if (!!event.data) computeMidiMessage(this, event)
            // if (!!$.target.send) $.send = () => $.target.send?.($.data)
        }

        if (!~$.step) $.step = abs($._movement) > $.threshold? 0: $.threshold
        if (!~$.step) return

        /**
         * if value is changed
         */
        $.last = $.active && !$._active   // ?
        $.first = !$.active && $._active  // ?
        $.active = shared[_ingKey] = $._active
        $.abs = abs($._delta)
        $.sign = sign($._movement)
        $.direction = sign($._delta)
        /**
         * save to each Map
         */
        $.movement = $._movement = $._movement - $.sign * $.step
        $.distance = $._distance = $.distance + $.abs
        $.offset = $._offset + $._movement
        $.value = $._value
        $.delta = $._delta
        if ($.last) return this.__end__?.()
        if ($.first) return void this.__start__?.()
        $.velocity = $._delta / $._deltaTime
        return void this.__change__?.()
    }

    /**
     * Fires the midi prop.
     */
    emit () {
        const { state: $, shared } = this
        if ($.blocked && !$.force) return
        const memo = this.prop({ ...shared, ...$, [this._key]: $._value })
        if (memo !== undefined) $.memo = memo
    }

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

    get config () {
        return this._ctrl.config
    }

    get prop() {
        return this._ctrl.props[this._key]!
    }
}

/**
 * calculate data on MIDI message event
 */
function computeMidiMessage (self: Engine<MidiKey>, event?: any) {
    const { state: $ } = self
    const [_p0=  0, _p1=  0, _p2=  0] = $.data || []
    const [_c0=_p0, _c1=_p1, _c2=_p2] = event.data || []
    if(!$.data)
        $.init = [_c0, _c1, _c2]
    $.data = [_c0, _c1, _c2]
    $.prev = [_p0, _p1, _p2]
    $.command = _c0 >> 4
    $.channel = _c0 & 0xf
    $.note = _c1
    $._value = _c2
    $._delta = _c2 - $.value
    $._movement = $.movement + $._delta
}

function resetMap ($: object, ...keys: string[]): void

function resetMap ($: any, ...keys: any[]) {
    each(keys, key => {
        let _k = key + 'Map', _m = $[_k], _n = $.node || 0
        if (_m) return _m.clear()
        _m = $[_k] = new Map()
        setHidden($, key, () => _m.get(_n), _t => void _m.set(_n, _t))
    })
}

function setHidden <T=any> (target: object, key: string, get?: () => T, set?: (t: T) => void): void

function setHidden (target={}, key='_', get?: any, set?: any) {
    Object.defineProperty(target, key, {get, set})
}
