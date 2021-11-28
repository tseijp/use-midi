import { MidiKey } from './state'
import { MIDIPort } from './events'

const defaultPort = (...keys: string[]) => keys[0]

export type Config <Key extends MidiKey|'shared'|'self'='self'> =
    NonNullable<SelfConfig[Key] & SharedConfig>

export type SelfConfig = {
    fade: FadeConfig & SharedConfig
    note: NoteConfig & SharedConfig
    turn: TurnConfig & SharedConfig
    self: NonNullable<SelfConfig & SharedConfig>
    shared: SharedConfig
}

export interface FadeConfig extends MidiConfig {
    range: number // TODO
}

export interface TurnConfig extends MidiConfig {}

export interface NoteConfig extends MidiConfig {}

export interface MidiConfig {
    enabled?: boolean // True when the Midi is active
    from?: number
}

type SelectPort = string | MIDIPort | {(...args: string[]): string | MIDIPort}

export interface SharedConfig <T extends EventTarget=EventTarget>{
    enabled: boolean // True when the Midi is active
    sysex: boolean // True when use the sysex option requesting MIDI access
    debug: boolean // True when use debug mode
    target: null | T // Raw Midi Event Object
    device: string  // Select Device Key
    port: SelectPort // Select Device Key
    input: SelectPort // Select Device Key
    output: SelectPort // Select Device Key
    threshold: number //
    transform: {(v: number): number}
    command: null | number
    channel: null | number // TODO
    note: null | number    // TODO
    args: null | any[]
    data: null | number[]
}

export const SharedConfig: Config<'shared'> = {
    enabled: true,
    sysex: false,
    debug: false,
    target: null,
    device: 'pointer',
    port: defaultPort,
    input: defaultPort,
    output: defaultPort,
    threshold: 0,
    transform: (v=0) => v || 0,
    command: null,
    channel: null,
    note: null,
    args: null,
    data: null
}
