import { MIDIKey, FullState, State, EventTypes } from './state'

export type Prop <
    Key extends MIDIKey,
    EventType = EventTypes<Key>
> = (
    state: Omit<FullState<Key>, 'event'> & { event: EventType }
) => any | void

export type Props = {
    onFader: Prop<'fader'>
    onButton: Prop<'button'>
}

type ReactDOMAttributes = React.DOMAttributes<EventTarget>

type NativePropsKeys = keyof Omit<ReactDOMAttributes, keyof Props | 'children' | 'dangerouslySetInnerHTML'>

type GetEventType<Key extends NativePropsKeys> = ReactDOMAttributes[Key] extends
    | React.EventHandler<infer EventType>
    | undefined
    ? EventType
    : UIEvent

export type NativeProps = {
    [key in NativePropsKeys]?: (
        state: State['shared'] & {
            event: GetEventType<key>
            args: any
        }, ...args: any
    ) => void
}

export type MIDIProps = Partial<NativeProps & Props>

export type InternalProps = {[Key in MIDIKey]?: Prop<Key, any>}
