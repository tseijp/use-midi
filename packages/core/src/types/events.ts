import { MidiKey } from './state'

export type FullEventTypes = {
    button: MIDIMessageEvent & MIDIConnectionEvent
    fader: MIDIMessageEvent & MIDIConnectionEvent
    note: MIDIMessageEvent & MIDIConnectionEvent
    full: FullEventTypes
}

export type EventTypes<Key extends MidiKey|'full'='full'> =
    NonNullable<FullEventTypes[Key]>

// Type definitions for Web MIDI API 2.0
// Project: http://www.w3.org/TR/webmidi/
// Definitions by: Toshiya Nakakura <https://github.com/nakakura>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface MIDIOptions {sysex: boolean;}

type MIDIInputMap = Map<string, MIDIInput>;
type MIDIOutputMap = Map<string, MIDIOutput>;

export interface MIDIAccess extends EventTarget {
    inputs: MIDIInputMap;
    outputs: MIDIOutputMap;
    sysexEnabled: boolean;
    onstatechange(e: MIDIConnectionEvent): void;

    addEventListener(
        type: 'statechange',
        listener: (this: this, e: MIDIConnectionEvent) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;

    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
}

type MIDIPortType = 'input' | 'output';
type MIDIPortDeviceState = 'disconnected' | 'connected';
type MIDIPortConnectionState = 'open' | 'closed' | 'pending';

export interface MIDIPort extends EventTarget {
    id: string;
    manufacturer?: string | undefined;
    name?: string | undefined;
    type: MIDIPortType;
    version?: string | undefined;
    state: MIDIPortDeviceState;
    connection: MIDIPortConnectionState;
    onstatechange(e: MIDIConnectionEvent): void;

    addEventListener(
        type: 'statechange',
        listener: (this: this, e: MIDIConnectionEvent) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;

    open(): Promise<MIDIPort>;
    close(): Promise<MIDIPort>;
}

export interface MIDIInput extends MIDIPort {
    type: 'input';
    onmidimessage(e: MIDIMessageEvent): void;

    addEventListener(
        type: 'midimessage',
        listener: (this: this, e: MIDIMessageEvent) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: 'statechange',
        listener: (this: this, e: MIDIConnectionEvent) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
}

export interface MIDIOutput extends MIDIPort {
    type: 'output';

    /**
     * Enqueues the message to be sent to the corresponding MIDI port.
     * @param data The data to be enqueued, with each sequence entry representing a single byte of data.
     * @param timestamp The time at which to begin sending the data to the port. If timestamp is set
     * to zero (or another time in the past), the data is to be sent as soon as
     * possible.
     */
    send(data: number[] | Uint8Array, timestamp?: number): void;

    /**
     * Clears any pending send data that has not yet been sent from the MIDIOutput 's
     * queue. The implementation will need to ensure the MIDI stream is left in a good
     * state, so if the output port is in the middle of a sysex message, a sysex
     * termination byte (0xf7) should be sent.
     */
    clear(): void;
}

export interface MIDIMessageEvent extends Event {
    /**
     * A timestamp specifying when the event occurred.
     */
    receivedTime: number;

    /**
     * A Uint8Array containing the MIDI data bytes of a single MIDI message.
     */
    data: Uint8Array;
}

export interface MIDIConnectionEvent extends Event {
    /**
     * The port that has been connected or disconnected.
     */
    port: MIDIPort;
}

const tmp:MIDIMessageEvent & MIDIConnectionEvent = {} as any
