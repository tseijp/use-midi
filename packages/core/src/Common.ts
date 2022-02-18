import { MidiKey, Props, State, Config, SelectPort, MIDIInput, MIDIOutput } from './types'
import { Controller } from './Controller'
import { rma } from './rma'
import { is } from './utils'

const defaultPort = (...keys: string[]) => keys[0]

export abstract class Common<Key extends MidiKey|'shared'|'self'='self'> {
    readonly _ctrl: Controller
    readonly _key: Key

    constructor (ctrl?: Controller, key?: Key) {
        this._ctrl = ctrl || this as unknown as Controller
        this._key = key!
    }

    /**
     * Shorthand to call upon property reference,
     * Bound to each value of ctrl.
     */
    protected set state (state: any) { // State<Key>) { // @TODO
        if (!is.und(this._key))
            this._ctrl._state[this._key] = state
    }

    protected get props (): Props<Key> {
        return this._ctrl._props[this._key]
    }

    protected get state (): State<Key> {
        return this._ctrl._state[this._key]
    }

    protected get config (): Config<Key> {
        return this._ctrl._config[this._key]
    }

    /**
     * Shorthand to call upon property reference,
     * Bound to shared value of ctrl.
     */
    protected get $state (): State<'shared'> {
        return this._ctrl._state.shared
    }

    protected get $config (): Config<'shared'> {
        return this._ctrl._config.shared
    }

    protected get input (): MIDIInput {
        const { input, port } = this.$config
        return parsePort(input || port, rma.inputs) as MIDIInput
    }

    protected get output (): MIDIOutput {
        const {output, port } = this.$config
        return parsePort(output || port, rma.outputs) as MIDIOutput
    }
}

/**
 * Parse MIDI input or output ports from MIDI key or a function returning key.
 */
export function parsePort (
    port: SelectPort,
    ports?: any // @TODO fix any
): MIDIInput | MIDIOutput | undefined {
    if (port === 'default') port = defaultPort
    if (is.fun(port) && ports) port = port(...(ports!?.keys() || []))
    if (is.num(port) && ports) return [...ports.values()][port]
    if (is.str(port) && ports) return ports!?.get(port)
    return undefined
}
