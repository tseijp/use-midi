import { MidiKey, Props, Config } from './types'
import { EventStore, AccessStore } from './stores'
import { EngineMap, ConfigMap } from './actions'
import { each, eachProp, chain } from './utils'

export class Controller {
    private _eventStore  = new AccessStore()
    public eventStores: { [key in string]?: EventStore } = {}
    public accessStores: { [key in string]?: AccessStore } = {}
    public keys = new Set<MidiKey>()
    public engine = {} as any
    public config = {} as any
    public native = {} as any
    public props = {}
    public state = {
        shared: {}
    } as any

    constructor (props: Props) {
        this.props = props
        if (props.onButton) this.setup('button')
        if (props.onFader) this.setup('fader')
        if (props.onNote) this.setup('note')
    }

    /**
     * setup each stores from midi key
     */
    setup (key: MidiKey) {
        this.keys.add(key)
        this.eventStores[key] = new EventStore()
        this.accessStores[key] = new AccessStore()
    }

    /**
     * Executes side effects on each render.
     */
    effect () {
        if (this.config.shared.target) this.bind()
        return () => this._eventStore.clean()
    }

    /**
     * Cleans all side effects when the controller did unounted
     */
    clean () {
        each(this.keys, key => {
            this.eventStores[key]!.clean()
            this.accessStores[key]!.clean()
        })
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
        const {keys, eventStores, engine, native, config, state} = this
        const target = config.shared.target || state.shared.target
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
                if (config[key]!.enabled) {
                    const Engine = EngineMap.get(key)!
                    engine[key] = new Engine(this, args, key)
                    engine[key].bind(bindFn)
                }
            })

        eachProp(native, (prop, key) => bindFn(
            key,
            event => prop({...state.shared, event, args}),
            true
        ))

        eachProp(props, (prop, key) => (props[key] = chain(...prop)))

        // if (!target) return props

        /**
         * register each handler to stores
         */
        eachProp(props, (prop, key) => eventStores[key]?.add(target, key, prop))
    }
}

function parseConfig (config: any, midiKey?: MidiKey) {
    const {enabled, target, ...other} = config
    const _config: any = {shared: {enabled, target}}
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

// function bindToProps (props: any) {
//     return (
//         device: string,
//         action: string,
//         handler: (event: any) => void,
//         // options: AddEventListenerOptions = {},
//     ) => {
//         const type = 'on' + device + action
//         props[type] = props[type] || []
//         props[type].push(handler)
//     }
// }
