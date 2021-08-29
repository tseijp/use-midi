import {each} from './utils'
import { MidiKey } from './types'
import { Engine } from './Engine'
import { ButtonEngine, FaderEngine } from './engines'
import type { Controller } from './Controller'

export type EngineClass<Key extends MidiKey> = {
    new (controller: Controller, args: any[], key: Key): Engine<Key>
}

export type ConfigClass<Key extends MidiKey> = {
    new (controller: Controller, args: any[], key: Key): any
}

export type Action = {
    key: MidiKey
    engine: EngineClass<MidiKey>
    config: ConfigClass<MidiKey>
}

export const EngineMap = new Map<MidiKey, EngineClass<any>>()

export const ConfigMap = new Map<MidiKey, ConfigClass<any>>()//ResolverMap>()

export const Actions = {
    button: {
        engine: ButtonEngine,
        config: {} as any
    },
    fader: {
        engine: FaderEngine,
        config: {} as any
    },
    note: {
        engine: FaderEngine,
        config: {} as any
    }
}
export function registerAction (...midiKeys: MidiKey[]) {
    each(midiKeys, key => {
        EngineMap.set(key, Actions[key].engine)
        ConfigMap.set(key, Actions[key].config)
    })
}
