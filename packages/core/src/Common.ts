import { MidiKey, State, MIDIAccess, MIDIInput, MIDIOutput } from './types'
import { Controller } from './Controller'
import { rma } from './rma'
import { is } from './utils'

const defaultPort = (...keys: string[]) => keys[0]

export abstract class Common<Key extends MidiKey|'shared'|'self'='self'> {
    readonly _key: Key
    readonly _ctrl: Controller

    constructor (ctrl?: Controller, key?: Key)
    constructor (ctrl: any, key: any) {
        this._ctrl = ctrl || this as unknown as Controller
        this._key = key!
    }

    /**
     * Shorthand to call upon property reference,
     * Bound to each value of ctrl.
     */
    protected get props () {
        return this._ctrl._props[this._key]
    }

    protected get state () {
        return this._ctrl._state[this._key]
    }

    protected get config () {
        return this._ctrl._config[this._key] || {}
    }

    protected set state (state: State<Key>) {
        if (!is.und(this._key))
            this._ctrl._state[this._key] = state
    }

    /**
     * Shorthand to call upon property reference,
     * Bound to shared value of ctrl.
     */
    protected get $state () {
        return this._ctrl._state.shared
    }

    protected get $config () {
        return this._ctrl._config.shared
    }

    protected get input () {
        const { $config } = this
        return parsePort($config.input || $config.port, rma.inputs) as MIDIInput
    }

    protected get output () {
        const { $config } = this
        return parsePort($config.output || $config.port, rma.outputs) as MIDIOutput
    }
}

/**
 * Parse MIDI input or output ports from MIDI key or a function returning key.
 */
export function parsePort (
    port?: string | {(...keys: string[]): string},
    ports?:  MIDIAccess['inputs' | 'outputs']
): MIDIInput | MIDIOutput

export function parsePort (port: any, ports?: any) {
    if (port === 'default') port = defaultPort
    if (is.fun(port) && ports) port = port(...(ports!?.keys() || []))
    if (is.num(port) && ports) return [...ports.values()][port]
    if (is.str(port) && ports) return ports?.get(port)
    return port
}
