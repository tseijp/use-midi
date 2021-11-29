import { each, eachProp, call, is } from './utils'
import { MidiKey, IngKey, State } from './types'
import { Controller } from './Controller'
import { Common } from './Common'

const { abs, sign } = Math

export interface Engine<Key extends MidiKey> extends Common<Key> {
    /**
     * Function to compute at a specific time, such as engine startup.
     * You can redefine it after you extend it.
     */
    __init__?(): void
    __first__?(): void
    __update__?(): void
    __last__?(): void
}

export abstract class Engine<Key extends MidiKey> extends Common<Key> {
    abstract readonly _ingKey: IngKey
    readonly _kwargs: State<Key>

    constructor (ctrl: Controller, key: Key, kwargs: State<Key>) {
        super(ctrl, key)
        this._kwargs = kwargs
        if (!this.state) {
            this.state = {data: [0, 0, 0]} as State<Key>
            this.__init__?.()
            this.reset()
        }
    }

    /**
     * event listeners are properly set by the  Controller.
     */
    protected abstract bind (
        bindFn: (
            device: string,
            action: string,
            prop: (event: any) => void,
            isNative?: boolean
        ) => void
    ): void

    /**
     * reset state if init run
     */
    protected reset () {
        const { state: $, config, $state, $config, _ingKey, _kwargs, output } = this
        /**
         * calculate each initial value
         */
        $.value = $.delta = $.offset = $.distance = $.movement = 0
        $.deltaTime = $.timeStamp = $.elapsedTime = 0
        $._active = $.active = $.blocked = $.force = $state[_ingKey] = false
        $.command = $.memo = null
        $.offset = $._offset = config.from? call(config.from): $._offset
        $.threshold = abs($config.transform($config.threshold))
        $.send = () => (($.target as any)?.send || output?.send)?.($.data)
        $.first = true
        $.step = -1
        $.args = $config.args
        $.data = $config.data!
        $.note = $config.note
        $.channel = $config.channel
        if (_kwargs.data) computeMidiMessage(_kwargs)
        eachProp(_kwargs, (prop, key) => ($[key] = prop))
    }

    /**
     * start of evemt
     */
    protected start (event?: any) {
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
     * calculate event
     */
    protected compute (event?: any) {
        const { state: $, $state, $config, _ingKey } = this
        /**
         * sets event properties on all event handlers.
         */
        if (event) {
            computeEventMessage($, event)
            if (event.data)
                computeMidiMessage($, event)
        }

        const _m = $config.transform($._movement)
        if (!~$.step) $.step = abs(_m) > $.threshold? 0: $.threshold
        if (!~$.step || !$._active || $.blocked) if (!$.active) return

        /**
         * The following will be run when the value changes.
         */
        $.last = $.active && !$._active
        $.first = !$.active && $._active
        $.active = $state[_ingKey] = $._active

        $.abs = abs($._delta)
        $.sign = sign(_m)
        $.direction = sign($._delta)
        $.movement = $._movement = _m - $.sign * $.step
        $.distance = $._distance = $.distance + $.abs
        $.offset = $._offset + $._movement
        $.value = $._value
        $.delta = $._delta
        $.velocity = $._delta / $.deltaTime
        if ($.last) return this.__last__?.()
        if ($.first) return this.__first__?.()
        else return this.__update__?.()
    }

    /**
     * Fire the processes of the input midi prop.
     */
    protected emit () {
        const { state: $, $state } = this
        if ($.blocked && !$.force) return
        const memo = this.props({ ...$state, ...$, [this._key]: $._value })
        if (!is.und(memo)) $.memo = memo
    }
}

/**
 * calculate time on event message
 */
function computeEventMessage ($: any, event: any) {
    $.event = event
    $.type = event.type
    $.deltaTime = event.timeStamp - $.timeStamp
    $.timeStamp = event.timeStamp
    $.elapsedTime = $.timeStamp - $.startTime
}

/**
 * calculate data on MIDI message event
 */
function computeMidiMessage ($: any, event?: any) {
    const [_p0=  0, _p1=  0, _p2=  0] = $.data || []
    const [_c0=_p0, _c1=_p1, _c2=_p2] = event.data || []
    if(!$.init)
        $.init = [_c0, _c1, _c2]
    $.data = [_c0, _c1, _c2], $.command = _c0 >>  4, $._value = _c2,  $.note = _c1
    $.prev = [_p0, _p1, _p2], $.channel = _c0 & 0xf, $._delta = _c2 - $.value
    $._movement = $.movement + $._delta
}
// function resetMap ($: object, ...keys: string[]): void
//
// function resetMap ($: any, ...keys: any[]) {
//     each(keys, key => {
//         let _map = $[key + 'Map'], k = $.note || 0
//         if (_map) return _map.clear()
//         _map = $[key + 'Map'] = new Map()
//         setHidden($, key, () => _map.get(k) || 0, v => void _map.set(k, v))
//         $[key] = $['_' + key] = 0
//     })
// }
// function setHidden <T=any> (target: object, key: string, get?: () => T, set?: (t: T) => void): void
//
// function setHidden (target={}, key='_', get?: any, set?: any) {
//     Object.defineProperty(target, key, {get, set})
// }
