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
        registerAction('button', 'slider', 'knob', 'note')
        super(target, props, config, undefined, native)
    }
}

export class Button <E = Events<'button'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        button: Prop<'slider', E>,
        config: Config<'button'> | {} = {}
    ) {
        registerAction('button')
        super(target, { button }, config, 'button')
    }
}

export class Slider <E = Events<'slider'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        slider: Prop<'slider', E>,
        config: Config<'slider'> | {} = {}
    ) {
        registerAction('slider')
        super(target, { slider }, config, 'slider')
    }
}

export class Knob <E = Events<'knob'>> extends Recognizer {
    constructor (
        target: EventTarget | string | ((e: any) => string),
        knob: Prop<'knob', E>,
        config: Config<'knob'> | {} = {}
    ) {
        registerAction('knob')
        super(target, { knob }, config, 'knob')
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
