import { Any } from '../rma'
import { Events } from './events'
export type MidiKey = Exclude<keyof SelfState, 'shared'|'self'>

export type IngKey = 'fading' | 'noting' | 'turning'
export type IngState = {[key in IngKey]: boolean}

export type State<Key extends MidiKey|'shared'|'self'='self'> =
    NonNullable<SelfState[Key] & GenericState>

export type SelfState = {
    fade: FadeState
    turn: TurnState
    note: NoteState
    self: NonNullable<SelfState & GenericState>
    shared: NonNullable<SharedState & GenericState>
}

export interface SharedState {
    fading: boolean // True if the target is being faded.
    noting: boolean // True if the target is being noted.
    turning: boolean // True if the target is being turned.
    messaging: boolean // True if the target is being messaged.
    requested: boolean // True when user grant permission to access MIDI devices.
    supported: boolean // True when Web MIDI API is supported by the browser.
    allowed: boolean // True when user gave permission to access MIDI devices.
}

export interface FadeState extends GenericState {
    axis?: 'vertical' | 'horizontal'
    converse?: 'unipolar' | 'bipolar'
    event: Events<'fade'>
    from: number
}

export interface NoteState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
    event: Events<'note'>
}

export interface TurnState extends GenericState {
    number: number
    from: number
    to: number
    mode: 'momentary' | 'toggle' | 'trigger'
    event: Events<'turn'>
}

export interface GenericState {
    [key: string]: any // @TODO fix any
    args: null | Any[] // The arguments when you bind
    memo: null | Any // TODO
    send: {():void} // TODO
    type: string // Raw Midi Event type
    target: EventTarget // Raw Target Object
    currentTarget: EventTarget // Raw Target Object

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

    command: null | number // recieved Midi command code
    channel: null | number // recieved Midi channel number
    note: null | number // recieved Midi note number if recieved

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
