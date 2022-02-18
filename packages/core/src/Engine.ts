import { eachProp, call, is } from './utils'
import { Events, MidiKey, IngKey, State } from './types'
import { Controller } from './Controller'
import { Common } from './Common'
const { abs, sign } = Math

export type BindFun<Key extends MidiKey> = (
    prop: (event: Events<Key>) => void,
    device: string,
    action?: string,
    isNative?: boolean
) => void

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
    protected abstract bind (bindFun: BindFun<Key>): void

    /**
     * reset state if init run
     */
    protected reset () {
        const { state: $, $state, config, $config, _ingKey, _kwargs, output } = this
        /**
         * calculate each initial value
         */
        $.value = $.delta = $.offset = $.distance = $.movement = 0
        $.deltaTime = $.timeStamp = $.elapsedTime = 0
        $._active = $.active = $.blocked = $.force = $state[_ingKey] = false
        $.command = $.memo = null
        $.offset = $._offset = config?.from? call(config.from): $._offset
        $.threshold = abs($config.transform($config.threshold))
        // @ts-ignore
        $.send = () => ($.target.send || output?.send)?.($.data)
        $.first = true
        $.step = -1
        $.args = $config.args
        $.data = $config.data!
        $.note = $config.note
        $.channel = $config.channel
        if (_kwargs.data) computeMidiMessage(_kwargs)
        eachProp(_kwargs, (prop, key) => (($ as any)[key] = prop)) // @TODO fix any
    }

    /**
     * start of evemt
     */
    protected start (event?: Events<Key>) {
        const { state: $, } = this
        if (!$._active) {
            this.reset()
            $._active = true
            $.target = event?.target!
            $.currentTarget = event?.currentTarget!
        }
        $.startTime = $.timeStamp = event?.timeStamp || 0
    }

    /**
     * calculate event
     */
    protected compute (event?: Events<Key>) {
        const { state: $, $state, $config, _ingKey } = this
        /**
         * sets event properties on all event handlers.
         */
        if (event) {
            computeEventMessage<Key>($, event)
            if (event.data)
                computeMidiMessage<Key>($, event)
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
        if ($.blocked && !$.force) return // @ts-ignore @TODO
        const memo = this.props({...$state, ...$, [this._key]: $._value })
        if (!is.und(memo)) $.memo = memo!
    }
}

/**
 * calculate time on event message
 */
function computeEventMessage<Key extends MidiKey> ($: State<Key>, event: Events<Key>) {
    $.event = event
    $.type = event.type
    $.deltaTime = event.timeStamp - $.timeStamp
    $.timeStamp = event.timeStamp
    $.elapsedTime = $.timeStamp - $.startTime
}

/**
 * calculate data on MIDI message event
 */
function computeMidiMessage<Key extends MidiKey> ($: State<Key>, event?: Events<Key>) {
    const [_p0=  0, _p1=  0, _p2=  0] = $.data || []
    const [_c0=_p0, _c1=_p1, _c2=_p2] = event?.data || []
    if(!$.init)
        $.init = [_c0, _c1, _c2]
    $.data = [_c0, _c1, _c2], $.command = _c0 >>  4, $._value = _c2,  $.note = _c1
    $.prev = [_p0, _p1, _p2], $.channel = _c0 & 0xf, $._delta = _c2 - $.value
    $._movement = $.movement + $._delta
}
