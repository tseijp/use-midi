import {MIDIKey} from './state'

export interface GenericConfig {
    // TODO
    target?: any

    // TODO
    window?: any

    // TODO
    enabled?: boolean
}

export interface MIDIConfig {
    // TODO
    enables?: boolean

    // TODO
    channel?: number
}

export interface FaderConfig extends MIDIConfig {}

export interface ButtonConfig extends MIDIConfig {}

export interface NoteConfig extends MIDIConfig {}

type FullConfig = {
    shared?: GenericConfig
    button?: ButtonConfig
    fader?: FaderConfig
    note?: NoteConfig
}

export type Config <Key extends (MIDIKey|null)=null> = GenericConfig &
    Key extends MIDIKey
        ? FullConfig[Key]
        : FullConfig
