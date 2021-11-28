import { Engine } from '../Engine'

export class NoteEngine extends Engine<'note'> {
    _ingKey = 'noting' as const

    bind (fun: any) {
        const { device } = this.$config
        fun(this.midimessage.bind(this), 'midimessage')
        fun(this.devicestart.bind(this), device, 'start')
        fun(this.deviceend.bind(this), device, 'out')
        fun(this.deviceend.bind(this), device, 'up')
    }

    midimessage (event: any) {
        const { state: $ } = this
        if (!$.active)
            this.start(event)
        this.compute(event)
    }

    devicestart (event: PointerEvent) {
        const { state: $ } = this
        this.start(event)
        $._value = 0xff
        $._movement = $._delta = $.value - $._value
        this.compute(event)
        this.emit()
    }

    deviceend (event: PointerEvent) {
        const { state: $ } = this
        if (!$._active) return
        $._value = 0
        $._movement = $._delta = $.value - $._value
        $._active = false
        this.compute(event)
        this.emit()
    }
}
