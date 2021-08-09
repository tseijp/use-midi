import { MIDIKey } from './types'
import {
    ButtonEngine,
    FaderEngine,
    BaseEngine as Engine
 } from './engines'

import type { ResolverMap } from '../config/resolver'
import type { Controller } from './Controller'


export type EngineClass<Key extends MIDIKey> = {
    new (controller: Controller, args: any[], key: Key): Engine<Key>
}

export type ConfigClass<Key extends MIDIKey> = {
    new (controller: Controller, args: any[], key: Key): any
}

export type Action = {
    key: MIDIKey
    engine: EngineClass<MIDIKey>
    config: ConfigClass<MIDIKey>
}

export const EngineMap = new Map<MIDIKey, EngineClass<any>>()
export const ConfigMap = new Map<MIDIKey, ResolverMap>()

export function registerAction(action: Action) {
    EngineMap.set(action.key, action.engine)
    ConfigMap.set(action.key, action.config)
}

export const ButtonAction = {
    key: 'button',
    engine: ButtonEngine,
    config: {}
}

export const FaderAction = {
    key: 'fader',
    engine: FaderEngine,
    config: {}
}
