import { MidiKey, State } from './state'
import { Events } from './events'

export type Props<Key extends MidiKey|'shared'|'self'='self'> =
    NonNullable<SelfProps[Key] & NativeProps>

export type SelfProps = {
    fade: Prop<'fade'>
    turn: Prop<'turn'>
    note: Prop<'note'>
    self: NonNullable<SelfProps & NativeProps>
    shared: any // TODO
}

export type Prop <
    Key extends MidiKey,
    E = Events<Key>
> = (
    state: Omit<State<Key>, 'event'> & { event: E }
) => any | void

export type NativeProps <T extends Partial<Props>={}> = {
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
    keyof SelfProps | 'children' | 'dangerouslySetInnerHTML'
>

type GetEvent<Key extends NativeKey> = ReactDOMAttributes[Key] extends
    | React.EventHandler<infer Event>
    | undefined
    ? Event
    : UIEvent
