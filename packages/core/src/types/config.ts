import {MidiKey} from './state'

export interface GenericConfig {
    // Raw Midi Event Object
    target?: EventTarget

    // True when the Midi is active
    enabled?: boolean
}

export interface MidiConfig {
    // TODO
    enabled?: boolean

    // TODO
    channel?: number
}

export interface ButtonConfig extends MidiConfig {}

export interface FaderConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

type FullConfig = {
    shared?: GenericConfig
    button?: ButtonConfig
    fader?: FaderConfig
    note?: NoteConfig
    full?: FullConfig
}

export type Config <Key extends MidiKey|'full'='full'> = GenericConfig & FullConfig[Key]
