import { Engine, BindFun } from '../Engine'
import { Events } from '../types'

export class NoteEngine extends Engine<'note'> {
    readonly _ingKey = 'noting' as const

    bind (fun: BindFun<'note'>) {
        const { device } = this.$config
        fun(this.midimessage.bind(this), 'midimessage')
        fun(this.devicestart.bind(this), device, 'start')
        fun(this.deviceend.bind(this), device, 'end')
        fun(this.deviceend.bind(this), device, 'out')
    }

    midimessage (event: Events<'note'>) {
        const { state: $ } = this
        if (!$.active)
            this.start(event)
        this.compute(event)
    }

    devicestart (event: Events<'note'>) {
        const { state: $ } = this
        this.start(event)
        $._value = 0xff
        $._movement = $._delta = $.value - $._value
        $._active = true
        this.compute(event)
        this.emit()
    }

    deviceend (event: Events<'note'>) {
        const { state: $ } = this
        if (!$._active) return
        $._value = 0
        $._movement = $._delta = $.value - $._value
        $._active = false
        this.compute(event)
        this.emit()
    }
}
