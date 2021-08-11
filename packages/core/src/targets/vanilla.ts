import { Props } from '../types'
import { registerAction } from '../actions'
import { Prop, EventTypes, Config } from '../types'
import { GenericConfig, MidiKey, InternalProps, NativeProps } from '../types'
import { Controller } from '../Controller'

export class Recognizer {
    readonly _key?: MidiKey
    readonly _ctrl: Controller
    constructor (
        target: EventTarget,
        props: Props,
        config: GenericConfig,
        key?: MidiKey,
        nativeProps?: NativeProps
    ) {
        this._key = key
        this._ctrl = new Controller(props)
        this._ctrl.applyProps(props, nativeProps)
        this._ctrl.applyConfig({ ...config, target }, this._key)
        this._ctrl.effect()
    }
    destroy () {
        this._ctrl.clean()
    }
}

export class Fader <EventType = EventTypes['fader']>extends Recognizer {
    constructor (
      target: Element,
      fader: Prop<'fader', EventType>,
      config: Config<'fader'> | {} = {}
    ) {
        registerAction('fader')
        super(target, { fader }, config, 'fader')
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
