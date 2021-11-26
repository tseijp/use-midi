import { each, eachProp, chain, is, toPropEvent } from './utils'
import { MidiKey, Props, Config, MIDIAccess, MIDIInput, MIDIOutput } from './types'
import { FadeEngine, TurnEngine, NoteEngine } from './engines'
import { EventStore, AccessStore } from './stores'
import { rma } from './rma'

export const EngineMap = new Map<MidiKey, any>()

export const ConfigMap = new Map<MidiKey, any>()

export const Actions = {
    fade: { engine: FadeEngine, config: {} as any },
    turn: { engine: TurnEngine, config: {} as any },
    note: { engine: NoteEngine, config: {} as any },
}

export class Controller {
    public keys = new Set<MidiKey>()
    public native = {} as any
    private _props = {} as Props
    private _state = {shared: {}} as any
    private _config = {shared: {}} as any
    private _event = new EventStore()
    private _access = new AccessStore()

    constructor (props: Props={}) {
        this._props = props
        if (props.fade) this.keys.add('fade')
        if (props.note) this.keys.add('note')
        if (props.turn) this.keys.add('turn')
    }

    /**
     * Executes side effects on each render and,
     * Cleans all side effects when the controller did unounted
     */
    effect () {
        const { target, device } = this._config.shared
        if (target || device) this.bind()
    }

    clean () {
        this._event.clean()
        this._access.clean()
    }

    /**
     * Attaches props and config when each render
     */
    apply (props?: Props, config?: Config, ...keys: MidiKey[]) {
        if (keys.length > 1) [this._props, this.native] = parseProps(props!)
        else this._props = props || this._props
        this._config = parseConfig(config, ...keys)
        each(keys, key => {
            EngineMap.set(key, Actions[key].engine)
            ConfigMap.set(key, Actions[key].config)
        })
        if (!config?.target)
            return this.bind.bind(this)
    }

    /**
     * The bind function that can be returned by hooks
     */
    bind (...args: any[]) {
        const props: any = {}, midi: any[] = [], kwargs = parseKwargs(...args)  // !!!
        const { keys, native, _state: $, _access, _event } = this
        let { target, enabled } = this._config.shared

        /**
         * Bind native functions you set and functions in Engine to props.
         */
        const fun = (prop: {(e: any): void}, device='', key='') => {
            if (!key) return midi.push(prop)
            const type = !device? key: toPropEvent(device, key)
            props[type] = props[type] || []
            props[type].push(prop)
        }

        /**
         * Initialize engine and bind functions with fun!
         */
        if (enabled)
            each(keys, key => new (EngineMap.get(key)!)(this, key, kwargs).bind(fun))      // !!!
        eachProp(native, (p, k) => fun(e => p({...$.shared, event: e, ...kwargs}), '', k)) // !!!
        eachProp(props, (p, k) => void (props[k] = chain(...p)))

        /**
         * Register target and each handler to stores
         * When target isn't specified then return hanlder props.
         */
        _access.add(() => _event.add(this.input, 'midimessage', chain(...midi)))

        if (!target)
            return props
        else eachProp(props, (prop, key) => {
            const eventKey = key.substr(2).toLowerCase()
            _event.add(target, eventKey, prop)
        })
    }

    /**
     * shorthands of each port
     */
    get props () {
        return this._props
    }

    get state () {
        return this._state
    }

    get config () {
        return this._config
    }

    get input () {
        const shared = this._config.shared
        return parsePort(shared.input || shared.port, rma.inputs) as MIDIInput
    }

    get output () {
        const shared = this._config.shared
        return parsePort(shared.output || shared.port, rma.outputs) as MIDIOutput
    }
}

const RE_NOT_NATIVE = /^(fade|turn|note|midimessage|statechange)/
const defaultPort = (...keys: string[]) => keys[0]

export function parsePort (
    port?: string | {(...keys: string[]): string},
    ports?:  MIDIAccess['inputs' | 'outputs']
): MIDIInput | MIDIOutput

export function parsePort (port: any=defaultPort, ports?: any) {
    if (is.fun(port)) port = port(...ports!?.keys())
    if (is.str(port)) port = ports?.get(port)
    return port
}

export function parseProps (_props: Props) {
    const props: any = {}, native: any = {}
    eachProp(_props, (prop, key) => {
        if (RE_NOT_NATIVE.test(key))
            props[key] = prop
        else native[key] = prop
    })
    return [props, native]
}

function parseKwargs (...args: any[]): object
function parseKwargs (note: () => number, ...args: []): object
function parseKwargs (data: () => number[], ...args: any[]): object
function parseKwargs (state: () => object, ...args: []): object

function parseKwargs (arg?: unknown, ...args: any[]) {
    if (!is.fun(arg))
        return {args: [arg, ...args]}
    arg = arg(...args)
    if (is.num(arg))
        return {note: arg, args}
    if (is.arr(arg) && is.num(arg[0]))
        return {data: arg, args}
    if (is.obj(arg))
        return {...arg, args}
}

export const sharedConfig: Config<'shared'> = {
    enabled: true,
    device: 'pointer',
    threshold: 0,
    transform: (v=0) => v || 0,
    output: defaultPort,
    input: defaultPort,
    port: defaultPort,
}

function parseConfig (_config: any, ...keys: MidiKey[]) {
    const other: any = {}, config: any = {shared: sharedConfig}
    eachProp(_config, (prop, key) => {
        (key in sharedConfig? config.shared: other)[key] = prop
    })
    if (keys.length === 1) {
        const target = ConfigMap.get(keys[0])
        config[keys[0]] = {...target, ...other}
    } else {
        eachProp(other, (prop, key) => {
            const target = ConfigMap.get(key as any)
            if (target)
                config[key] = {...target, ...prop}
        })
    }
    return config
}
