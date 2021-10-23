import { Engine } from '../Engine'

export class ButtonEngine extends Engine<'button'> {
    _key = 'button' as const

    bind (bindFn: any) {
        // const device = this.config.device // mouse | pointer | touch
        bindFn('midimessage', '' , this.midimessage.bind(this))
        bindFn('pointer', 'start', this.pointerStart.bind(this), true)
        bindFn('pointer', 'end'  , this.pointerEnd.bind(this), true)
    }

    midimessage (event: any) {
        this.compute(event)
    }

    pointerStart (event: PointerEvent) {
        this.start(event)
        this.compute(event)
        this.emit()
    }

    pointerEnd (event: PointerEvent) {
        const { state } = this
        if (!state.active) return
        state.active = false
    }
}
