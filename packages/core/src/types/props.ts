import { MidiKey, FullState } from './state'
import { EventTypes, MIDIMessageEvent, MIDIConnectionEvent } from './events'

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

export type Native = {
    midimessage: (event: MIDIMessageEvent) => any | void
    statechange: (event: MIDIConnectionEvent) => any | void
}

export type MidiProps = Partial<Native & Props>
