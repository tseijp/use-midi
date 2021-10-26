import { Engine } from '../Engine'

export class FadeEngine extends Engine<'fade'> {
    _ingKey = 'fading' as const

    bind (bindFn: any) {
        const device = this.config.shared.device
        bindFn(device,   'start', this.devicestart.bind(this), true)
        bindFn(device,  'change', this.devicechange.bind(this))
        bindFn(device,  'cancel', this.deviceend.bind(this))
        bindFn(device,     'end', this.deviceend.bind(this))
        bindFn('midimessage', '', this.compute.bind(this))
    }

    reset (this: FadeEngine) {
        super.reset()
        const { state: $ } = this
        $.tap = false
        $.canceled = false
    }

    devicestart (event: PointerEvent) {
        const { state: $ } = this
        this.start(event)
        $._value = event.clientX + event.clientY
        $._initial = $._value
        this.compute(event)
    }

    devicechange (event: PointerEvent) {
        const { state: $ } = this
        const {clientX: x, clientY: y} = event
        const [px, py] = $.values
        const [mx, my] = $.movements
        const [dx, dy] = [x - px, y - py]
        $._delta = [dx, dy]
        $._value = [x, y]
        $._movements = [mx + dx, my + my]
        this.compute(event)
    }

    deviceend (event: PointerEvent) {
        const { state: $ } = this
        this.compute(event)
        const [dx, dy] = $.distance
        $.tap = dx <= 3 && dy <= 3
    }

    midimessage (event: any) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
