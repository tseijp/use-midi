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

    // True when use the sysex option requesting MIDI access
    sysex: boolean

    // True when use debug mode
    debug: boolean
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
