import { is } from '../utils'
import { Props } from '../types'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Prop, MidiKey, EventTypes, Config, Native } from '../types'

export class Recognizer {
    readonly _key?: MidiKey
    readonly _ctrl: Controller

    constructor (
        target: EventTarget | string | ((e: any) => string),
        props: Props | {} = {},
        config: Config | {} = {},
        key?: MidiKey,
        native?: Native
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

export class Button <EventType = EventTypes<'button'>> extends Recognizer {
    constructor (
        target:  | string | ((e: any) => string),
        onButton: Prop<'fader', EventType>,
        config: Config<'button'> | {} = {}
    ) {
        registerAction('button')
        super(target, { onButton }, config, 'button')
    }
}

export class Fader <EventType = EventTypes<'fader'>> extends Recognizer {
    constructor (
        target:  | string | ((e: any) => string),
        onFader: Prop<'fader', EventType>,
        config: Config<'fader'> | {} = {}
    ) {
        registerAction('fader')
        super(target, { onFader }, config, 'fader')
    }
}

export class Note <EventType = EventTypes<'note'>> extends Recognizer {
    constructor (
        target:  | string | ((e: any) => string),
        onNote: Prop<'note', EventType>,
        config: Config<'note'> | {} = {}
    ) {
        registerAction('note')
        super(target, { onNote }, config, 'note')
    }
}

export class Midi extends Recognizer {
    constructor (
        target:  | string | ((e: any) => string),
        _props: Props | {} = {},
        config: Config | {} = {}
    ) {
        const [props, native] = parseProps(_props)
        registerAction('button', 'fader', 'note')
        super(target, props, config, undefined, native)
    }
}
