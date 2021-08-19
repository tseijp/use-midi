import { Props } from '../types'
import { registerAction } from '../actions'
import { Prop, MidiKey, EventTypes, Config } from '../types'
import { Controller } from '../Controller'

export class Recognizer {
    readonly _key?: MidiKey
    readonly _ctrl: Controller
    constructor (
        target: EventTarget,
        props: Props | {},
        config: Config | {},
        key?: MidiKey,
    ) {
        this._key = key
        this._ctrl = new Controller(props)
        this._ctrl.applyProps(props)
        this._ctrl.applyConfig({ ...config as any, target }, key)
        this._ctrl.effect()
    }
    destroy () {
        this._ctrl.clean()
    }
}

export class Fader <EventType = EventTypes<'fader'>> extends Recognizer {
    constructor (
      target: Element,
      onFader: Prop<'fader', EventType>,
      config: Config<'fader'> | {} = {}
    ) {
        registerAction('fader')
        super(target, { onFader }, config, 'fader')
    }
}

export class Button <EventType = EventTypes<'button'>> extends Recognizer {
    constructor (
      target: Element,
      onButton: Prop<'fader', EventType>,
      config: Config<'button'> | {} = {}
    ) {
        registerAction('button')
        super(target, { onButton }, config, 'button')
    }
}

export class Midi extends Recognizer {
    constructor (
        target: HTMLElement,
        props: Props,
        config: Config | {} = {}
    ) {
        registerAction('button', 'fader', 'note')
        super(target, props, config, undefined)
    }
}
