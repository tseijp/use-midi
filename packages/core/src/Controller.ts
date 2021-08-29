import { each, eachProp, chain, is } from './utils'
import { EventStore, AccessStore } from './stores'
import { MidiKey, Props, Config } from './types'
import { EngineMap, ConfigMap } from './actions'

export class Controller {
    public keys = new Set<MidiKey>()
    public eventStore = new EventStore()
    public accessStore = new AccessStore()
    public engine = {} as any
    public native = {} as any
    public props = {} as any
    public state = {shared: {}} as any
    public config = {shared: {}} as any

    constructor (props: Props) {
        this.props = props
        if (props.onButton) this.keys.add('button')
        if (props.onFader) this.keys.add('fader')
        if (props.onNote) this.keys.add('note')
    }

    /**
     * setup each stores from midi key
     */
    setup (key: MidiKey) {
        this.keys.add(key)
    }

    /**
     * Executes side effects on each render.
     */
    effect () {
        const { target, device } = this.config.shared
        if (target || device) this.bind()
        return () => this.accessStore.clean()
    }

    /**
     * Cleans all side effects when the controller did unounted
     */
    clean () {
        this.eventStore.clean()
    }

    /**
     * Attaches props and config
     */
    applyProps (props: Props, native: any) {
        this.props = props
        this.native = native
    }

    applyConfig (config: Config, midiKey?: MidiKey) {
        this.config = parseConfig(config, midiKey)
    }

    /**
     * The bind function that can be returned by hooks
     */
    bind (...args: any) {
        const props: any = {}
        const { keys, eventStore, accessStore, engine, native, config, state } = this
        let { target, device } = config.shared
        const bindFn = (_type='', prop: (e: any) => void, isNative=false) => {
            const type = isNative? _type: _type // TODO
            props[type] = props[type] || []
            props[type].push(prop)
        }

        /**
         * initialize engine and bind
         */
        if (config.shared.enabled)
            each(keys, key => {
                const Engine = EngineMap.get(key)!
                engine[key] = new Engine(this, args, key)
                engine[key].bind(bindFn)
            })

        eachProp(props, (prop, key) => void (props[key] = chain(...prop)))

        eachProp(native, (prop, key) => {
            bindFn(key, event => prop({...state.shared, event, args}), true)
        })

        /**
         * register target and  each handler to stores
         */
        accessStore.add(event => {
            const { inputs, outputs } = event.target
            if (is.fun(device))
                device = device(event)
            if (!target)
                target = inputs?.get(device) || outputs?.get(device)
            eachProp(props, (prop, key) => {
                eventStore.add(target, key, prop)
            })
        })
    }
}

function parseConfig (config: any, midiKey?: MidiKey) {
    const {enabled=true, target, device, ...other} = config
    const _config: any = {shared: {enabled, target, device}}
    if (midiKey) {
        const target = ConfigMap.get(midiKey)
        _config[midiKey] = {...target, ...other}
    } else {
        eachProp(other, (cfg, key) => {
            const target = ConfigMap.get(key as any)
            if (target)
                _config[key] = {...target, ...cfg}
        })
    }
    return _config
}

const RE_NOT_NATIVE = /^on(Note|Fader|Button)/

export function parseProps(_props: Props) {
    const props: any = {}
    const other: any = {}
    eachProp(_props, (prop, key) => {
        if (RE_NOT_NATIVE.test(key))
            props[key] = prop
        else other[key] = prop
    })
    return [props, other]
}
