import React from 'react'
import { MidiKey, State, FullState, EventTypes } from './state'

export type Prop <
    Key extends MidiKey,
    EventType = EventTypes<Key>
> = (
    state: Omit<FullState<Key>, 'event'> & { event: EventType }
) => any | void

export type Props = Partial<{
    onButton: Prop<'button'>
    onFader: Prop<'fader'>
    onNote: Prop<'button'>
}>

type _ReactDOMAttributes = React.DOMAttributes<EventTarget>

type _NativeKeys = keyof Omit<_ReactDOMAttributes, keyof Props | 'children' >

type _Event<Key extends _NativeKeys> = _ReactDOMAttributes[Key] extends
    | React.EventHandler<infer EventType>
    | undefined
    ? EventType
    : UIEvent

export type Native = {
    [key in _NativeKeys]?: (
        state: State['shared'] & { event: _Event<key>; args: any }, ...args: any
    ) => void
}

export type MidiProps = Partial<Native & Props>
