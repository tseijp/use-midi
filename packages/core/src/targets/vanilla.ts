import { is } from '../utils'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Prop, Props, MidiKey, Events, Config, NativeProps } from '../types'

export class Recognizer {
    readonly _key?: MidiKey
    readonly _ctrl: Controller

    constructor (
        target: EventTarget | string | ((e: any) => string),
        props: Props | {},
        config: Config | {},
        key?: MidiKey,
        native?: NativeProps
    ) {
        this._key = key
        this._ctrl = new Controller(props)
        this._ctrl.applyProps(props, native)
        this._ctrl.applyConfig(config, key)
        if (is.str(target) || is.fun(target))
            this._ctrl.config.shared.device = target
        else this._ctrl.config.shared.target = target
        this._ctrl.effect()
    }

    destroy () {
        this._ctrl.clean()
    }
}

export class Midi extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        _props: Props | {} = {},
        config: Config | {} = {}
    ) {
        const [props, native] = parseProps(_props)
        registerAction('fade', 'turn', 'note')
        super(target, props, config, undefined, native)
    }
}

export class Fade <E = Events<'fade'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        fade: Prop<'fade', E>,
        config: Config<'fade'> | {} = {}
    ) {
        registerAction('fade')
        super(target, { fade }, config, 'fade')
    }
}

export class Turn <E = Events<'turn'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        turn: Prop<'turn', E>,
        config: Config<'turn'> | {} = {}
    ) {
        registerAction('turn')
        super(target, { turn }, config, 'turn')
    }
}

export class Note <E = Events<'note'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        note: Prop<'note', E>,
        config: Config<'note'> | {} = {}
    ) {
        registerAction('note')
        super(target, { note }, config, 'note')
    }
}
