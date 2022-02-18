import { Engine, BindFun } from '../Engine'
import { Events } from '../types'

export class TurnEngine extends Engine<'turn'> {
    readonly _ingKey = 'turning' as const

    bind (fun: BindFun<'fade'>) {
        fun(this.midimessage.bind(this), 'midimessage')
    }

    midimessage (event: Events<'turn'>) {
        const { state: $ } = this
        if (!$._active)
            this.start(event)
        this.compute(event)
    }
}
