import {MidiKey} from './state'

export interface GenericConfig {
    // TODO
    target?: any

    // TODO
    window?: any

    // TODO
    enabled?: boolean
}

export interface MidiConfig {
    // TODO
    enables?: boolean

    // TODO
    channel?: number
}

export interface FaderConfig extends MidiConfig {}

export interface ButtonConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

type FullConfig = {
    shared?: GenericConfig
    button?: ButtonConfig
    fader?: FaderConfig
    note?: NoteConfig
}

export type Config <Key extends (MidiKey|null)=null> = GenericConfig &
    Key extends MidiKey
        ? FullConfig[Key]
        : FullConfig
