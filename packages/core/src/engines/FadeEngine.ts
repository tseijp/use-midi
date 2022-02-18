import { Engine, BindFun } from '../Engine'
import { Events } from '../types'

export class FadeEngine extends Engine<'fade'> {
    readonly _ingKey = 'fading' as const

    bind (fun: BindFun<'fade'>) {
        const { device } = this.$config
        fun(this.compute.bind(this), 'midimessage')
        fun(this.devicestart.bind(this), device, 'start')
        fun(this.devicechange.bind(this), device, 'change')
        fun(this.deviceend.bind(this), device, 'end')
        fun(this.deviceend.bind(this), device, 'cancel')
    }

    reset (this: FadeEngine) {
        super.reset()
        // const { state: $ } = this
        // $.tap = false
        // $.canceled = false
    }

    devicestart (event: Events<'fade'>) {
        const { state: $ } = this
        this.start(event)
        $._value = event.clientX + event.clientY
        $._active = true
        // $.initial = $._value
        this.compute(event)
    }

    devicechange (event: Events<'fade'>) {
        const { state: $ } = this
        const { clientX: x, clientY: y } = event
        $._value = x + y
        $._delta = $.value - $.value
        $._movement = $.movement + $._delta
        this.compute(event)
    }

    deviceend (event: Events<'fade'>) {
        // const { state: $ } = this
        this.compute(event)
        this.emit()
        // $.tap = $.distance <= 3 && dy <= 3
    }

    midimessage (event: Events<'fade'>) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
