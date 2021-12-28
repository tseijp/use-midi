import { Engine } from '../Engine'

export class FadeEngine extends Engine<'fade'> {
    _ingKey = 'fading' as const

    bind (fun: any) {
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

    devicestart (event: PointerEvent) {
        const { state: $ } = this
        this.start(event)
        $._value = event.clientX + event.clientY
        $._active = true
        this.compute(event)
    }

    devicechange (event: PointerEvent) {
        const { state: $ } = this
        const { clientX: x, clientY: y } = event
        $._value = x + y
        $._delta = $.value - $.value
        $._movement = $.movement + $._delta
        this.compute(event)
    }

    deviceend (event: PointerEvent) {
        // const { state: $ } = this
        this.compute(event)
        this.emit()
        // $.tap = $.distance <= 3 && dy <= 3
    }

    midimessage (event: any) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
