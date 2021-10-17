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

export class Button <E = Events<'button'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        onButton: Prop<'fader', E>,
        config: Config<'button'> | {} = {}
    ) {
        registerAction('button')
        super(target, { onButton }, config, 'button')
    }
}

export class Fader <E = Events<'fader'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        onFader: Prop<'fader', E>,
        config: Config<'fader'> | {} = {}
    ) {
        registerAction('fader')
        super(target, { onFader }, config, 'fader')
    }
}

export class Knob <E = Events<'knob'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        onKnob: Prop<'knob', E>,
        config: Config<'knob'> | {} = {}
    ) {
        registerAction('knob')
        super(target, { onKnob }, config, 'knob')
    }
}

export class Note <E = Events<'note'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        onNote: Prop<'note', E>,
        config: Config<'note'> | {} = {}
    ) {
        registerAction('note')
        super(target, { onNote }, config, 'note')
    }
}

export class Midi extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        _props: Props | {} = {},
        config: Config | {} = {}
    ) {
        const [props, native] = parseProps(_props)
        registerAction('button', 'fader', 'knob', 'note')
        super(target, props, config, undefined, native)
    }
}
