import { Engine } from '../Engine'

export class NoteEngine extends Engine<'note'> {
    _ingKey = 'noting' as const

    bind (bindFn: any) {
        const device = this.config.shared.device
        bindFn('midimessage', '', this.midimessage.bind(this))
        bindFn(device,   'start', this.devicestart.bind(this), true)
        bindFn(device,   'end'  , this.deviceend.bind(this), true)
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
        this.compute(event)
        this.emit()
        $._active = false
    }
}
