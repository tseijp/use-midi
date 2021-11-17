import { MidiKey } from './state'
import { MIDIPort } from './events'

export type Config <Key extends MidiKey|'shared'|'full'='full'> =
    SharedConfig & FullConfig[Key]

export type FullConfig = {
    shared?: SharedConfig
    full?: FullConfig
    fade?: FadeConfig
    note?: NoteConfig
    turn?: TurnConfig
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

export type SharedConfig = Partial<{
    enabled: boolean    // True when the Midi is active
    sysex: boolean      // True when use the sysex option requesting MIDI access
    debug: boolean      // True when use debug mode
    target: EventTarget // Raw Midi Event Object
    device: string      // Select Device Key
    port: SelectPort    // Select Device Key
    input: SelectPort   // Select Device Key
    output: SelectPort  // Select Device Key
    threshold: number   //
    transform: {(v: number): number}
    channel: number // TODO
    note: number    // TODO
    args: any[]     // TODO
}>
