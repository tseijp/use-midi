export type IngKey =
    | 'input'
    | 'output'

export type MidiKey = Exclude<keyof FullState, 'shared'|'full'>

export interface SharedState {
    target: EventTarget // Raw Target Object
    allowed: boolean    // True when user gave permission to access MIDI devices
    requested: boolean  // True when user grant permission to access MIDI devices
    supported: boolean  // True when Web MIDI API is supported by the browser
}

export interface GenericState {
    args ?: any    // The arguments when you bind
    event : Event  // Raw Midi Event Object
    type  : string // Raw Midi Event type

    active : boolean // True when the Midi is active
    blocked: boolean // True when the Midi is blocked
    enabled: boolean // True when the Midi is enabled
    first  : boolean // True when its the first event
    last   : boolean // True when its the last event

    startTime  : number // The start time of the current event
    deltaTime  : number // The delta between current and previous event
    timeStamp  : number // The timestamp of the current event
    elapsedTime: number // Elapsed tie of the current Midi

    init : number[] // Raw values when the Midi started
    data : number[] // Current raw values of the Midi
    prev : number[] // Previous raw values of the Midi
    delta: number[] // Between current raw Midi values and previous values
    sign : number[] // Direction of the delta values

    command  : number // The number of recieved Midi command code
    channel  : number // The number of recieved Midi channel number
    noteNum ?: number // The number of Midi note number if recieved
    velocity?: number // The number of Midi velocity number if recieved
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

export interface KnobState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
}

export interface FullState {
    shared: SharedState
    button?: ButtonState
    fader?: FaderState
    knob?: KnobState
    note?: NoteState
    full?: FullState
}

export type State<Key extends MidiKey|'shared'> =
    GenericState & NonNullable<FullState[Key]>
