import { Engine } from '../Engine'

export class TurnEngine extends Engine<'turn'> {
    _ingKey = 'turning' as const

    bind (fun: any) {
        fun(this.midimessage.bind(this), 'midimessage')
    }

    midimessage (event: any) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
