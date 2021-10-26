import { Engine } from '../Engine'

export class TurnEngine extends Engine<'turn'> {
    _ingKey = 'turning' as const

    bind (bindFn: any) {
        bindFn('midimessage', '', this.midimessage.bind(this))
    }

    midimessage (event: any) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
