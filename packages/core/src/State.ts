export type IngKey =
| 'input'
| 'output'

export type MIDIEvent = any // todo

export type EventTypes = any // TODO

export type EventTarget = any // todo

export interface SharedState {
}

export interface GenericState {
    _active: boolean
    _enabled: boolean

    // Raw MIDI Event Object
    event: MIDIEvent

    // Raw Targe tObject
    target: EventTarget

    // The number of MIDI channel
    channel: number

    // Raw input number
    inputs: number[]

    // Raw output number
    outputs: number[]

    // Current raw values of the MIDI
    values: number[]

    // Raw values when the MIDI started
    initial: number[]

    // True when its the first event
    first: boolean

    // True when its the last event
    last: boolean

    // True when the MIDI is active
    active: boolean

    // The timestamp of the current event
    startTime: number

    // The timestamp of the current event
    timeStamp: number

    // Elapsed tie of the current MIDI
    elapsedTime: number

    // The arguments when you bind
    args?: any
}


export interface FaderState extends GenericState {
    axis?: 'vertical' | 'horizontal'
    converse?: 'unipolar' | 'bipolar'
}

export interface NoteState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
}

export interface State {
    shared: SharedState
    fader?: FaderState
    note?: NoteState
}
