import { MidiKey, State } from './state'
import { Events } from './events'

export type Prop <
    Key extends MidiKey,
    E = Events<Key>
> = (
    state: Omit<State<Key>, 'event'> & { event: E }
) => any | void

export type Props = Partial<FullProps & NativeProps>

export type FullProps = Partial<{
    button: Prop<'button'>
    slider: Prop<'slider'>
    knob: Prop<'knob'>
    note: Prop<'note'>
}>

export type NativeProps <T extends Props = {}> = {
    [key in NativeKey]?: (
        state: State<'shared'> & {
            event: undefined extends T[key]
                ? GetEvent<key>
                : T[key]
            args: any
        },
        ...args: any
    ) => void
}

type ReactDOMAttributes = React.DOMAttributes<EventTarget>

type NativeKey = keyof Omit<
    ReactDOMAttributes,
    keyof FullProps | 'children' | 'dangerouslySetInnerHTML'
>

type GetEvent<Key extends NativeKey> = ReactDOMAttributes[Key] extends
    | React.EventHandler<infer Event>
    | undefined
    ? Event
    : UIEvent
