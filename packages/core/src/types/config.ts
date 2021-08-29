import { MidiKey } from './state'

interface SharedConfig {
    // True when the Midi is active
    enabled?: boolean

    // True when use the sysex option requesting MIDI access
    sysex: boolean

    // True when use debug mode
    debug: boolean

    // Raw Midi Event Object
    target?: EventTarget

    // select MIDI Device Key
    device?: string | ((event: any) => string)
}

export interface MidiConfig {
    // True when the Midi is active
    enabled?: boolean
}

export interface ButtonConfig extends MidiConfig {}

export interface FaderConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

type FullConfig = {
    shared?: SharedConfig
    button?: ButtonConfig
    fader?: FaderConfig
    note?: NoteConfig
    full?: FullConfig
}

export type Config <Key extends MidiKey|'full'='full'> =
    SharedConfig & FullConfig[Key]
