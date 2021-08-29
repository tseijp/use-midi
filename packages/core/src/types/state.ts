export type IngKey =
    | 'input'
    | 'output'

export type MidiKey = Exclude<keyof State, 'shared'>

export interface SharedState {
    // Raw Target Object
    target: EventTarget

    // True when user gave permission to access MIDI devices
    allowed: boolean

    // True when user grant permission to access MIDI devices
    requested: boolean

    // True when Web MIDI API is supported by the browser
    supported: boolean
}

export interface GenericState {
    // Raw Midi Event Object
    event: Event

    // Raw Event Target Object
    target: EventTarget

    // Raw Midi Event type
    type: string

    // True when the Midi is active
    active: boolean

    // True when the Midi is blocked
    blocked: boolean

    // True when the Midi is active
    enabled: boolean

    // True when its the first event
    first: boolean

    // True when its the last event
    last: boolean

    // The start time of the current event
    startTime: number

    // The delta between current and previous event
    deltaTime: number

    // The timestamp of the current event
    timeStamp: number

    // Elapsed tie of the current Midi
    elapsedTime: number

    // Raw values when the Midi started
    init: number[]

    // Current raw values of the Midi
    data: number[]

    // Previous raw values of the Midi
    prev: number[]

    // Between current raw Midi values and previous values
    delta: number[]

    // Direction of the delta values
    sign: number[]

    // The number of recieved Midi command code
    command: number

    // The number of recieved Midi channel number
    channel: number

    // The number of Midi note number if recieved
    noteNum: number | undefined

    // The number of Midi velocity number if recieved
    velocity: number | undefined

    // The arguments when you bind
    args?: any
}

export interface ButtonState extends GenericState {
    value: boolean
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
    button?: ButtonState
    fader?: FaderState
    note?: NoteState
}

export type FullState<Key extends MidiKey> =
    GenericState & NonNullable<State[Key]>
