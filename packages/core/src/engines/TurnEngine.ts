import { Engine } from '../Engine'

export class TurnEngine extends Engine<'turn'> {
    _key = 'turn' as const

    bind (bindFn: any) {
        bindFn('midimessage', '', this.midimessage.bind(this))
    }

    midimessage (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}
