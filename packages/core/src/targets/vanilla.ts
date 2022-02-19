import { is } from '../utils'
import { Controller } from '../Controller'
import { Props, MidiKey, Config } from '../types'

export class Recognizer<P extends Props=Props, C extends Config=Config> {
    readonly _ctrl: Controller

    constructor (
        target: Config['target'],
        props: Partial<P>={},
        config: Partial<C>={},
        ...keys: MidiKey[]
    ) {
        if (is.str(target))
            config.device = target
        else config.target = target
        this._ctrl = new Controller(props)
        this._ctrl.apply(props, config, ...keys)
        this._ctrl.effect()
    }

    destroy () {
        this._ctrl.clean()
    }
}

export class Midi<P extends Props=Props, C extends Config=Config> extends Recognizer<P, C> {
    constructor (
        target: Config['target'],
        props: Partial<P>={},
        config: Partial<C>={}
    ) {
        super(target, props, config, 'fade', 'turn', 'note')
    }
}

export class Fade<C=Config<'fade'>> extends Recognizer {
    constructor (
        target: Config['target'],
        fade: Props<'fade'>,
        config: Partial<C>={}
    ) {
        super(target, { fade }, config, 'fade')
    }
}

export class Turn<C=Config<'turn'>> extends Recognizer {
    constructor (
        target: Config['target'],
        turn: Props<'turn'>,
        config: Partial<C>={}
    ) {
        super(target, { turn }, config, 'turn')
    }
}

export class Note<C=Config<'note'>> extends Recognizer {
    constructor (
        target: Config['target'],
        note: Props<'note'>,
        config: Partial<C>={}
    ) {
        super(target, { note }, config, 'note')
    }
}
