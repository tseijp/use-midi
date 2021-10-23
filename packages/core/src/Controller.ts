import { each, eachProp, chain, is, toPropEvent } from './utils'
import { EventStore, AccessStore } from './stores'
import { MidiKey, Props, Config } from './types'
import { EngineMap, ConfigMap } from './actions'

export class Controller {
    public keys = new Set<MidiKey>()
    public eventStore = new EventStore()
    public accessStore = new AccessStore()
    public engine = {} as any
    public native = {} as any
    public props = {} as Props
    public state = {shared: {}} as any
    public config = {shared: {}} as any

    constructor (props: Props={}) {
        this.props = props
        if (props.onButton) this.keys.add('button')
        if (props.onSlider) this.keys.add('slider')
        if (props.onKnob) this.keys.add('knob')
        if (props.onNote) this.keys.add('note')
    }

    /**
     * Executes side effects on each render.
     */
    effect () {
        const { target, device } = this.config.shared
        if (target || device) this.bind()
    }

    /**
     * Cleans all side effects when the controller did unounted
     */
    clean () {
        this.accessStore.clean()
        this.eventStore.clean()
    }

    /**
     * Attaches props and config
     */
    applyProps (props: Props, native: any={}) {
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
        const props: any = {}, native: any = {}
        const { keys, eventStore, accessStore, engine, config, state } = this
        const bindFn = (device='', key='', prop: (e: any) => void, isNative=false) => {
            const [obj, type] = isNative? [native, toPropEvent(device, key)]: [props, device]
            obj[type] = obj[type] || []
            obj[type].push(prop)
        }
        /**
         * initialize engine and bind functions
         */
        if (config.shared.enabled)
            each(keys, key => {
                const Engine = EngineMap.get(key)!
                engine[key] = new Engine(this, args, key)
                engine[key].bind(bindFn)
            })

        eachProp(this.native, (prop, key) => {
            bindFn(key, '', event => prop({...state.shared, event, args}), true)
        })

        eachProp(props, (prop, key) => void (props[key] = chain(...prop)))

        eachProp(native, (prop, key) => void (native[key] = chain(...prop)))

        /**
         * register target and each handler to stores
         */
        accessStore.add(event => {
            this.state.event = event
            eachProp(props, (prop, key) => eventStore.add(this.port, key, prop))
        })

        /**
         * When target isn't specified then return hanlder props.
         */
        if (!config.shared.target) return native

        eachProp(native, (prop, key) => {
            const eventKey = key.substr(2).toLowerCase()
            eventStore.add(config.shared.target, eventKey, prop)
        })
    }

    /**
     * select port
     */
    get port () {
        const { config: {shared}, state } = this
        const { inputs, outputs } = state.event.target
        let port = state.port || shared.port
        if (is.fun(port)) port = port(...inputs?.keys(), ...outputs?.keys())
        if (is.str(port)) port = inputs?.get(port) || outputs?.get(port)
        if (!port) return console.warn('Error: Can not select MIDI Port')
        return port
    }
}

const RE_NOT_NATIVE = /^on(Button|Slider|Knob|Note|MidiMessage|StateChange)/ // this is not native?
const defaultPort = (...keys: string[]) => keys[0]

export function parseProps(_props: Props) {
    const props: any = {}
    const native: any = {}
    eachProp(_props, (prop, key) => {
        if (RE_NOT_NATIVE.test(key))
            props[key] = prop
        else native[key] = prop
    })
    return [props, native]
}

function parseConfig (config: any, midiKey?: MidiKey) {
    const {enabled=true, target, device='pointer', port=defaultPort, ...other} = config
    const _config: any = {shared: {enabled, target, device, port}}
    if (midiKey) {
        const target = ConfigMap.get(midiKey)
        _config[midiKey] = {...target, ...other}
    } else {
        eachProp(other, (prop, key) => {
            const target = ConfigMap.get(key as any)
            if (target)
                _config[key] = {...target, ...prop}
        })
    }
    return _config
}
