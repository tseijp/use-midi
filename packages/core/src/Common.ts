import { MidiKey, Props, State, Config, MIDIAccess, MIDIInput, MIDIOutput } from './types'
import { Controller } from './Controller'
import { rma } from './rma'
import { is } from './utils'

export abstract class Common<Key extends MidiKey|'shared'|'self'='self'> {
    readonly _key: Key
    readonly _ctrl: Controller

    constructor (ctrl?: Controller, key?: Key) {
        this._ctrl = ctrl || this as unknown as Controller
        this._key = key!
    }

    /**
     * shorthands of each ctrl value
     */
    protected get props (): Props<Key> {
        return this._ctrl._props[this._key]
    }

    protected get state (): State<Key> {
        return this._ctrl._state[this._key]
    }

    protected get config (): Config<Key> {
        return this._ctrl._config[this._key] || {}
    }

    protected set state (state: State<Key>) {
        if (is.und(this._key)) return
        else this._ctrl._state[this._key] = state
    }

    /**
     * shorthands of shared ctrl value
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

export function parsePort (
    port?: string | {(...keys: string[]): string},
    ports?:  MIDIAccess['inputs' | 'outputs']
): MIDIInput | MIDIOutput

export function parsePort (port: any, ports?: any) {
    if (is.fun(port)) port = port(...(ports!?.keys() || []))
    if (is.str(port)) port = ports?.get(port)
    return port
}
