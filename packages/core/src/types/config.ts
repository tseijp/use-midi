import { MidiKey } from './state'
import { MIDIPort } from './events'

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

export type TurnConfig = MidiConfig

export type NoteConfig = MidiConfig

export interface MidiConfig {
    enabled?: boolean // True when the Midi is active
    from?: number
}

type SelectPort = string | MIDIPort | {(...args: string[]): string | MIDIPort}

export interface SharedConfig <T extends EventTarget=EventTarget>{
    enabled: boolean // True when the Midi is active.
    sysex: boolean // True when use the sysex option requesting MIDI access.
    debug: boolean // True when use debug mode.
    target: null | T // Raw Midi Event Object.
    device: string  // Select Device Key.
    port: SelectPort // Select input and output port key.
    input: SelectPort // Select input port key.
    output: SelectPort //Select output port key.
    threshold: number
    transform: {(v: number): number}
    delay: null | number // Default number of delay time stamp when send.
    command: null | number // Default number of recieved Midi command co10de.
    channel: null | number // Default number of recieved Midi channel number.
    note: null | number // Default number of Midi note number if recieved.
    data: null | number[] // Default raw values of the Midi.
    args: null | any[] // Default arguments when you bind.
}

export const SharedConfig: Config<'shared'> = {
    enabled: true,
    sysex: false,
    debug: false,
    target: null,
    device: 'pointer',
    port: 'default',
    input: 'default',
    output: 'default',
    threshold: 0,
    transform: (v=0) => v || 0,
    command: null,
    channel: null,
    note: null,
    args: null,
    data: null,
    delay: null
}
