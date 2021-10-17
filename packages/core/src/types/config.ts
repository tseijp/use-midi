import { MidiKey } from './state'

export type Config <Key extends MidiKey|'full'='full'> =
    SharedConfig & FullConfig[Key]

export type FullConfig = {
    shared?: SharedConfig
    button?: ButtonConfig
    fader?: FaderConfig
    knob?: KnobConfig
    note?: NoteConfig
    full?: FullConfig
}

export interface ButtonConfig extends MidiConfig {}

export interface FaderConfig extends MidiConfig {}

export interface KnobConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

export interface MidiConfig {
    enabled?: boolean // True when the Midi is active
}

interface SharedConfig {
    enabled?: boolean    // True when the Midi is active
    sysex ?: boolean     // True when use the sysex option requesting MIDI access
    debug ?: boolean     // True when use debug mode
    target?: EventTarget // Raw Midi Event Object
    device?: string      // Select Device Key
}
