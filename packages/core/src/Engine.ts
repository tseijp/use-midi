import { Controller } from './Controller'
import { each, call, is } from './utils'
import { MidiKey, IngKey, State } from './types'

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
    readonly _key: Key
    abstract readonly _ingKey: IngKey

    constructor (ctrl: Controller, key: Key) {
        this._ctrl = ctrl
        this._key = key

        if (!this.state) {
            this.state = {data: [0, 0, 0]} as State<Key>
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
        const { state: $, config, $config, _ctrl } = this
        resetMap($, 'value', 'delta', 'offset', 'distance', 'movement')
        $.deltaTime = $.timeStamp = $.elapsedTime = 0
        $._active = $.active = $.blocked = $.force = false // shared[_ingKey] = false
        $.command = $.memo = void 0
        $.channel = $.note
        $.threshold = abs($config.transform($config.threshold))
        $.offset = $._offset = config.from? call(config.from): $._offset
        $.send = () => (($.target as any)?.send || _ctrl.output?.send)?.($.data)
        $.first = true
        $.channel = $config.channel
        $.args = $config.args
        $.note = $config.note
        $.step = -1
    }

    /**
     * start of evemt
     */
    start (event?: any) {
        const { state: $, } = this
        if (!$._active) {
            this.reset()
            $._active = true
            $.target = event.target!
            $.currentTarget = event.currentTarget!
        }
        $.startTime = $.timeStamp = event?.timeStamp || 0
    }

    /**
     * calculate evemt
     */
    compute (event?: any) {
        const { state: $, $state, $config, _ingKey } = this
        $.args = $config.args
        // $.note = note
        // $.channel = channel

        /**
         * sets event properties on all event handlers
         */
        if (event) {
            $.event = event
            $.type = event.type
            $.deltaTime = event.timeStamp - $.timeStamp
            $.timeStamp = event.timeStamp
            $.elapsedTime = $.timeStamp - $.startTime
            if (!is.und(event.data)) computeMidiMessage(this, event)
        }

        const _m = $config.transform($._movement)
        if (!~$.step) $.step = abs(_m) > $.threshold? 0: $.threshold
        if (!~$.step || !$._active || $.blocked) if (!$.active) return

        /**
         * if value is changed
         */
        $.last = $.active && !$._active
        $.first = !$.active && $._active
        $.active = $state[_ingKey] = $._active
        $.abs = abs($._delta)
        $.sign = sign(_m)
        $.direction = sign($._delta)
        $state.movement = $.movement = $._movement = _m - $.sign * $.step
        $state.distance = $.distance = $._distance = $.distance + $.abs
        $state.offset = $.offset = $._offset + $._movement
        $state.value = $.value = $._value
        $state.delta = $.delta = $._delta
        if ($.last) return this.__end__?.()
        if ($.first) return void this.__start__?.()
        $.velocity = $._delta / $.deltaTime
        return void this.__change__?.()
    }

    /**
     * Fires the midi prop.
     */
    emit () {
        const { state: $, $state } = this
        if ($.blocked && !$.force) return
        const memo = this.prop({ ...$state, ...$, [this._key]: $._value })
        if (!is.und(memo)) $.memo = memo
    }

    /**
     * shorthands of ctrl value
     */
    get state (): State<Key> {
        return this._ctrl.state[this._key]!
    }

    set state (state: State<Key>) {
        this._ctrl.state[this._key] = state
    }

    get $state () {
        return this._ctrl.state.shared
    }

    get config () {
        return this._ctrl.config
    }

    get $config () {
        return this._ctrl.config.shared
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
    $.data = [_c0, _c1, _c2], $.command = _c0 >>  4, $._value = _c2,  $.note = _c1
    $.prev = [_p0, _p1, _p2], $.channel = _c0 & 0xf, $._delta = _c2 - $.value
    $._movement = $.movement + $._delta
}

function resetMap ($: object, ...keys: string[]): void

function resetMap ($: any, ...keys: any[]) {
    each(keys, key => {
        let _m = $[key + 'Map'], _n = $.node || 0
        $['_' + key] = 0
        if (_m) return _m.clear()
        _m = $[key + 'Map'] = new Map()
        setHidden($, key, () => _m.get(_n) || 0, _t => void _m.set(_n, _t))
    })
}

function setHidden <T=any> (target: object, key: string, get?: () => T, set?: (t: T) => void): void

function setHidden (target={}, key='_', get?: any, set?: any) {
    Object.defineProperty(target, key, {get, set})
}
