import { is } from '../utils'
import { Controller } from '../Controller'
import { Prop, Props, MidiKey, Events, Config } from '../types'

export class Recognizer {
    readonly _ctrl: Controller

    constructor (
        target: EventTarget | string | ((e: any) => string),
        props: Partial<Props> | {},
        config: Partial<Config> | {},
        ...keys: MidiKey[]
    ) {
        this._ctrl = new Controller(props)
        this._ctrl.apply(props, config, ...keys)
        if (is.str(target) || is.fun(target))
            this._ctrl.$config!.device = target as any
        else this._ctrl.$config!.target = target
        this._ctrl.effect()
    }

    destroy () {
        this._ctrl.clean()
    }
}

export class Midi extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        props: Props | {} = {},
        config: Config | {} = {}
    ) {
        super(target, props, config, 'fade', 'turn', 'note')
    }
}

export class Fade <E = Events<'fade'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        fade: Prop<'fade', E>,
        config: Config<'fade'> | {} = {}
    ) {
        super(target, { fade }, config, 'fade')
    }
}

export class Turn <E = Events<'turn'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        turn: Prop<'turn', E>,
        config: Config<'turn'> | {} = {}
    ) {
        super(target, { turn }, config, 'turn')
    }
}

export class Note <E = Events<'note'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        note: Prop<'note', E>,
        config: Config<'note'> | {} = {}
    ) {
        super(target, { note }, config, 'note')
    }
}
