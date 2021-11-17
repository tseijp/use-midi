export type MidiKey = Exclude<keyof FullState, 'shared'|'full'>

export type IngKey = 'fading' | 'noting' | 'turning'

export interface FullState {
    shared: SharedState
    fade?: FadeState
    turn?: TurnState
    note?: NoteState
    full?: FullState
}

export interface SharedState {
    allowed  : boolean    // True when user gave permission to access MIDI devices
    requested: boolean  // True when user grant permission to access MIDI devices
    supported: boolean  // True when Web MIDI API is supported by the browser
    messaging: boolean  // True if the target is being messaged.
    fading: boolean  // True if the target is being faded.
    noting: boolean  // True if the target is being noted.
    turning: boolean  // True if the target is being turned.
}

export type State<Key extends MidiKey|'shared'> =
    GenericState & NonNullable<FullState[Key]>

export interface FadeState extends GenericState {
    axis?: 'vertical' | 'horizontal'
    converse?: 'unipolar' | 'bipolar'
}

export interface NoteState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
}

export interface TurnState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
}

export interface GenericState {
    [key: string]: any // The arguments when you bind
    args: any[]      // The arguments when you bind
    memo: any        //
    send: {():void}  //
    type: string     // Raw Midi Event type
    event: Event     // Raw Midi Event Object
    target: EventTarget// Raw Target Object
    currentTarget: EventTarget// Raw Target Object

    _active: boolean
    force: boolean //
    active: boolean // True if the Midi is active
    blocked: boolean // True if the Midi is blocked
    enabled: boolean // True if the Midi is enabled
    first: boolean // True if its the first event
    last: boolean // True if its the last event

    startTime: number // The start time of the current event
    deltaTime: number // The delta between current and previous event
    timeStamp: number // The timestamp of the current event
    elapsedTime: number // Elapsed tie of the current Midi

    init: number[] // Raw values when the Midi started
    data: number[] // Current raw values of recieved Midi data
    prev: number[] // Previous raw values of recieved Midi data

    command?: number // recieved Midi command code
    channel?: number // recieved Midi channel number
    note?: number // Midi note number if recieved

    value: number // Midi velocity number if recieved
    delta: number // Difference between the current value and the previous value.
    offset: number // offset since the first midi value
    distance: number //
    movement: number //

    abs: number //
    step: number //
    sign: number //
    velocity: number //
    direction: number //
    threshold: number //

    _value: number //
    _delta: number //
    _offset: number
    _distance: number
    _movement: number

    valueMap: Map<number, number>
    deltaMap: Map<number, number>
    offsetMap: Map<number, number>
    distanceMap: Map<number, number>
    movementMap: Map<number, number>
}
