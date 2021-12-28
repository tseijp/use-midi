import { each, eachProp, chain, is, toPropEvent } from './utils'
import { EventStore, AccessStore, TimeoutStore } from './stores'
import { MidiKey, Props, Config, SharedConfig } from './types'
import { FadeEngine, TurnEngine, NoteEngine } from './engines'
import { Common } from './Common'

const RE_NOT_NATIVE = /^(fade|turn|note|midimessage|statechange)/
const EngineMap = new Map<MidiKey, any>()
const ConfigMap = new Map<MidiKey, any>()
const Actions = {
    fade: { engine: FadeEngine, config: {} },
    turn: { engine: TurnEngine, config: {} },
    note: { engine: NoteEngine, config: {} },
}

export class Controller extends Common {
    readonly _keys = new Set<MidiKey>()
    readonly _midi = new Set<(e: any) => void>()
    readonly _event = new EventStore()
    readonly _access = new AccessStore()
    readonly _timeout = new TimeoutStore()
    private native = {} as any
    _props = {shared: {}} as any
    _state = {shared: {}} as any
    _config = {shared: {}} as any

    constructor (props: Props | {}={}) {
        super()
        this._props = props as Props
        if ('fade' in props) this._keys.add('fade')
        if ('note' in props) this._keys.add('note')
        if ('turn' in props) this._keys.add('turn')
    }

    /**
     * Executes side effects on each render and,
     * Cleans all side effects when the controller did unounted
     */
    effect () {
        const { _midi, _access, _event, $config } = this
       _access.add(() => _event.add(this.input, 'midimessage', chain(..._midi)))
        if ($config.target || $config.device) this.bind()
        return () => _midi.clear()
    }

    clean () {
        this._event.clean()
        this._access.clean()
    }

    /**
     * Parse and attach props and configs when each render.
     * Each value has a Circler Reference for Shorthand.
     */
    apply (props?: Partial<Props>, config?: Partial<Config>, ...keys: MidiKey[]) {
        if (keys.length > 1)
            [this._props, this.native] = parseProps(props!)
        else this._props = props || this._props
        this._props.self = this._props
        this._state.self = this._state
        this._config.self = this._config
        this._config = parseConfig(config, ...keys)
        each(keys, key => {
            EngineMap.set(key, Actions[key].engine)
            ConfigMap.set(key, Actions[key].config)
        })
        if (!config?.target)
            return this.bind.bind(this)
    }

    /**
     * The bind function that can be returned by hooks.
     */
    bind (..._args: any[]) {
        const props = {} as any, args = parseArgs(..._args)
        const { _keys, _midi, native, _event, $state, $config } = this
        const { target, enabled } = $config

        /**
         * Bind functions in Engine and native functions you set to props.
         * Sort where to push handler function by using the arguments.
         */
        type Prop = {(e: any): void}
        const fun = (prop: Prop, device='', key='') => {
            if (!key) return _midi.add(prop)
            const type = !device? key: toPropEvent(device, key)
            props[type] = props[type] || []
            props[type].push(prop)
        }

        /**
         * Construct engines and bind handler functions with fun.
         * Merge multi processes pushed by fun into a single function.
         */
        if (enabled)
            each(_keys, k => new (EngineMap.get(k)!)(this, k, args).bind(fun))
        eachProp(native, (p, k) => fun(e => p({...$state, event: e, ...args}), '', k))
        eachProp(props, (p, k) => void (props[k] = chain(...p)))

        /**
         * When target isn't specified then return hanlder props.
         */
        if (!target)
            return props
        else eachProp(props, (prop, key) => {
            const eventKey = key.substr(2).toLowerCase()
            _event.add(target!, eventKey, prop)
        })
    }
}

function parseArgs (...args: any[]): object
function parseArgs (note: () => number, ...args: []): object
function parseArgs (data: () => number[], ...args: any[]): object
function parseArgs (state: () => object, ...args: []): object
function parseArgs (arg?: unknown, ...args: any[]) {
    if (!is.fun(arg))
        return {args: [arg, ...args]}
    arg = arg(...args)
    if (is.num(arg))
        return {note: arg, args}
    if (is.arr(arg) && is.num(arg[0]))
        return {data: arg, args}
    if (is.obj(arg))
        return {...arg, args}
    return {args: [arg, args]}
}

export function parseProps (_props: Partial<Props>) {
    const props: any = {}, native: any = {}
    eachProp(_props, (prop, key) => {
        if (RE_NOT_NATIVE.test(key))
            props[key] = prop
        else native[key] = prop
    })
    return [props, native]
}

function parseConfig (_config: Partial<Config>={}, ...keys: MidiKey[]) {
    const other: any = {}, config: any = {shared: SharedConfig}
    eachProp(_config, (prop, key) => {
        (key in SharedConfig? config.shared: other)[key] = prop
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
