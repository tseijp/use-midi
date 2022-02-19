import { MidiKey, State } from './state'
import { Events } from './events'
import { Any } from '../rma'

export type Props<Key extends MidiKey|'shared'|'self'='self'> =
    NonNullable<SelfProps[Key] & NativeProps>

export type SelfProps = {
    fade: Prop<'fade'>
    turn: Prop<'turn'>
    note: Prop<'note'>
    self: NonNullable<SelfProps & NativeProps>
    shared: NonNullable<SelfProps & NativeProps>
}

export type Prop <Key extends MidiKey> = (
    //  @TODO
    state: Any & State<'shared'> & Omit<State<Key>, 'event'> & { event: Events<Key> }
) => Any | void

export type NativeProps <T extends Partial<Props>={}> = {
    [key in NativeKey]?: (
        state: State<'shared'> & {
            args: Any[]
            event: undefined extends T[key]
                ? GetEvent<key>
                : T[key]
        },
        ...args: Any[]
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
