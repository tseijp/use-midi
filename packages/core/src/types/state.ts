export type IngKey =
    | 'input'
    | 'output'

export type MidiKey = Exclude<keyof State, 'shared'>

export type MidiEvent = any // todo

export type EventTypes = any // TODO

export type EventTarget = any // todo

export interface SharedState {
}

export interface GenericState {
    _active: boolean
    _enabled: boolean

    // Raw Midi Event Object
    event: MidiEvent

    // Raw Targe tObject
    target: EventTarget

    // The number of Midi channel
    channel: number

    // Raw input number
    inputs: number[]

    // Raw output number
    outputs: number[]

    // Current raw values of the Midi
    values: number[]

    // Raw values when the Midi started
    initial: number[]

    // True when its the first event
    first: boolean

    // True when its the last event
    last: boolean

    // True when the Midi is active
    active: boolean

    // The timestamp of the current event
    startTime: number

    // The timestamp of the current event
    timeStamp: number

    // Elapsed tie of the current Midi
    elapsedTime: number

    // The arguments when you bind
    args?: any
}

export interface ButtonState extends GenericState {

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
