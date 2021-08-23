import { MidiKey, FullState, EventTypes } from './state'

export type Prop <
    Key extends MidiKey,
    EventType = EventTypes<Key>
> = (
    state: Omit<FullState<Key>, 'event'> & { event: EventType }
) => any | void

export type Props = {
    onButton?: Prop<'button'>
    onFader?: Prop<'fader'>
    onNote?: Prop<'button'>
}
