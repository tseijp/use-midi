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
    public props = {} as Props
    public state = {shared: {}} as any
    public config = {shared: {}} as any

    constructor (props: Props={}) {
        this.props = props
        if (props.onButton) this.keys.add('button')
        if (props.onFader) this.keys.add('fader')
        if (props.onKnob) this.keys.add('knob')
        if (props.onNote) this.keys.add('note')
    }

    /**
     * Setup each stores from midi key // TODO DELETE
     *
     *   setup (key: MidiKey) {
     *       this.keys.add(key)
     *       this.ctrl.eventStores[key] = new EventStore(ctrl)
     *       this.ctrl.accessStores[key] = new AccessStore(ctrl)
     *   }
     */

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
            const type = device//isNative? device: toDomEvent(device, key)
            const target = isNative? native: props
            target[type] = target[type] || []
            target[type].push(prop)
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

        eachProp(native, (prop, key) => {
            bindFn(key, '', event => prop({...state.shared, event, args}), true)
        })

        eachProp(props, (prop, key) => void (props[key] = chain(...prop)))
        eachProp(native, (prop, key) => void (native[key] = chain(...prop)))

        /**
         * When target isn't specified then return hanlder props.
         */
        if (!config.target) return native

        /**
         * register target and each handler to stores
         */
        accessStore.add(event => {
            let port = state.port || config.shared.port
            const { inputs, outputs } = event.target
            if (is.fun(state.port)) port = port(event)
            state.port = port = inputs?.get(port) || outputs?.get(port)
            eachProp(props, (prop, key) => eventStore.add(port, key, prop))
        })

        eachProp(native, (prop, key) => {
            eventStore.add(state.target, key, prop)
        })
    }
}

const RE_NOT_NATIVE = /^on(Note|Fader|Button)/

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


// const EVENT_TYPE_MAP: any = {
//     midi: { start: 'access', change: 'access', end: 'access' },
//     state: { start: 'change', change: 'change', end: 'change' },
//     pointer: { start: 'down', change: 'move', end: 'up' },
//     mouse: { start: 'down', change: 'move', end: 'up' },
//     touch: { start: 'start', change: 'move', end: 'end' },
//     gesture: { start: 'start', change: 'change', end: 'end' }
// }
//
// export function toDomEvent(device: string, action = '') {
//     const deviceProps = EVENT_TYPE_MAP[device]
//     const actionKey = deviceProps ? deviceProps[action] || action : action
//     return device + actionKey
// }
