import { MidiKey } from './state'
import { MIDIPort } from './events'

export type Config <Key extends MidiKey|'full'='full'> =
    SharedConfig & FullConfig[Key]

export type FullConfig = {
    shared?: SharedConfig
    fade?: FadeConfig
    note?: NoteConfig
    turn?: TurnConfig
    full?: FullConfig
}

export interface FadeConfig extends MidiConfig {
    range: number // TODO
}

export interface TurnConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

export interface MidiConfig {
    enabled?: boolean // True when the Midi is active
}

type SelectPort = string | MIDIPort | {(...args: string[]): string | MIDIPort}

interface SharedConfig {
    enabled?: boolean    // True when the Midi is active
    sysex ?: boolean     // True when use the sysex option requesting MIDI access
    debug ?: boolean     // True when use debug mode
    target?: EventTarget // Raw Midi Event Object
    device?: string      // Select Device Key
    port?: SelectPort    // Select Device Key
}
