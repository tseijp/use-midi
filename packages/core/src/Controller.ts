import { each, eachProp, chain, is, toPropEvent } from './utils'
import { MidiKey, Props, State, Config, SharedConfig } from './types'
import { FadeEngine, TurnEngine, NoteEngine, Engines } from './engines'
import { EventStore, AccessStore } from './stores'
import { Common } from './Common'
import { Any } from './rma'

type ValueOf<T> = T[keyof T];
type Action = {engine: ValueOf<typeof Engines>, config: Partial<Config>}
const RE_NOT_NATIVE = /^(fade|turn|note|midimessage|statechange)/
const EngineMap = new Map<MidiKey, ValueOf<typeof Engines>>()
const ConfigMap = new Map<MidiKey, Partial<Config>>()
const Actions: {[key in MidiKey]: Action} = {
    fade: { engine: FadeEngine, config: {} },
    turn: { engine: TurnEngine, config: {} },
    note: { engine: NoteEngine, config: {} },
}

export class Controller extends Common {
    readonly _keys = new Set<MidiKey>()
    readonly _midi = new Set<(e: Event) => void>()
    readonly _event = new EventStore()
    readonly _access = new AccessStore()
    private native = {} as any // @TODO fix any
    _props: Props = {shared: {}} as Props
    _state: State = {shared: {}} as State
    _config: Config = {shared: {}} as Config

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
    apply (
        props?: Partial<Props>,
        config?: Partial<Config>,
        ...keys: MidiKey[]
    ): Controller['bind'] {
        if (keys.length > 1)
            [this._props, this.native] = parseProps(props!)
        else this._props = (props || this._props) as Props
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
        return () => {}
    }

    /**
     * The bind function that can be returned by hooks.
     */
    bind (...args: Any[]) {
        const props = {} as any, kwargs = parseArgs(...args)
        const { _keys, _midi, native, _event, $state, $config } = this
        const { target, enabled } = $config

        /**
         * Bind functions in Engine and native functions you set to props.
         * Sort where to push handler function by using the arguments.
         */
        const fun = (prop: ((e: Event) => void), device='', key='') => {
            if (!key) return _midi.add(prop)
            const type = !device? key: toPropEvent(device, key)
            props[type] = props[type] || []
            props[type].push(prop)
        }

        /**
         * Construct engines and bind handler functions with fun.
         * Merge multi processes pushed by fun into a single function.
         */
        if (enabled) //@ts-ignore
            each(_keys, key => new (EngineMap.get(key)!)(this, key, kwargs).bind(fun))
        eachProp(native, (p, k) => fun(e => p({...$state, event: e, ...kwargs}), '', k)) // @TODO
        eachProp(props, (p, k) => void (props[k] = chain(...p)))

        /**
         * When target isn't specified then return hanlder props.
         */
        if (!target) return props
        eachProp(props, (prop, key) => {
            const eventKey = key.substr(2).toLowerCase()
            _event.add(target as EventTarget, eventKey, prop)
        })
    }
}

function parseArgs (...args: Any[]): Any
function parseArgs (note: () => number|number[]|object, ...args: Any[]): Any
function parseArgs (arg?: unknown, ...args: Any[]) {
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
    const props: any = {}, native: any = {} //@TODO fix any
    eachProp(_props, (prop, key) => {
        if (RE_NOT_NATIVE.test(key))
            props[key] = prop
        else native[key] = prop
    })
    return [props, native]
}

function parseConfig (_config: Partial<Config>={}, ...keys: MidiKey[]) {
    const other: any = {}, config: any = {shared: SharedConfig} // @TODO fix any
    eachProp(_config, (prop, key) => {
        (key in SharedConfig? config.shared: other)[key] = prop
    })
    if (keys.length === 1)
        config[keys[0]] = {...ConfigMap.get(keys[0]), ...other}
    else eachProp(other, (prop, key) => {
        const target = ConfigMap.get(key as MidiKey)
        if (target) config[key] = {...target, ...prop}
    })
    return config
}
