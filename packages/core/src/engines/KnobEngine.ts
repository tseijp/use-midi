import { Engine } from '../Engine'

export class KnobEngine extends Engine<'knob'> {
    _key = 'knob' as const

    bind (bindFn: any) {
        bindFn('midimessage', '', this.midimessage.bind(this))
    }

    midimessage (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}
