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
    public props = {} as Props
    public state = {shared: {}} as any
    public config = {shared: {}} as any
    private _event = new EventStore()
    private _access = new AccessStore()

    constructor (props: Props={}) {
        this.props = props
        if (props.fade) this.keys.add('fade')
        if (props.note) this.keys.add('note')
        if (props.turn) this.keys.add('turn')
    }

    /**
     * Executes side effects on each render and,
     * Cleans all side effects when the controller did unounted
     */
    effect () {
        const { target, device } = this.config.shared
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
        if (keys.length > 1) [this.props, this.native] = parseProps(props!)
        else this.props = props || this.props
        this.config = parseConfig(config, ...keys)
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
    bind (config?: any) {
        if (!is.und(config)) {
            this.config = parseConfig(config)
            this.state.shared = {...this.state.shared, ...config}
        }
        const props: any = {}, midi: any[] = []
        const { keys, native, state: $, _access, _event } = this
        let { target, enabled } = this.config.shared
        const fun = (prop: {(e: any): void}, device='', key='') => {
            if (!key) return midi.push(prop)
            const type = !device? key: toPropEvent(device, key)
            props[type] = props[type] || []
            props[type].push(prop)
        }

        /**
         * Initialize engine and bind functions
         */
        if (enabled)
            each(keys, key => new (EngineMap.get(key)!)(this, key).bind(fun))
        eachProp(native, (p, k) => fun(e => p({...$.shared, event: e, ...config}), '', k))
        eachProp(props, (p, k) => void (props[k] = chain(...p)))

        /**
         * Register target and each handler to stores
         * When target isn't specified then return hanlder props.
         */
        _access.add(() => _event.add(this.input, 'midimessage', chain(...midi)))

        if (!target) return props
        else eachProp(props, (prop, key) => {
            let eventKey = key.substr(2).toLowerCase()
            _event.add(target, eventKey, prop)
        })
    }

    /**
     * shorthands of each port
     */
    get input () {
        const shared = this.config.shared
        return parsePort(shared.input || shared.port, rma.inputs) as MIDIInput
    }

    get output () {
        const shared = this.config.shared
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
