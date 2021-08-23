import { MidiKey, Props, Config } from './types'
import { EventStore, AccessStore } from './stores'
import { EngineMap, ConfigMap } from './actions'
import { each, eachProp } from './utils'

export class Controller {
    public keys = new Set<MidiKey>()
    public eventStores: { [key in MidiKey]?: EventStore } = {}
    public accessStores: { [key in MidiKey]?: AccessStore } = {}
    public config = {} as any
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
     * setup stores from midi key
     */
    setup (key: MidiKey) {
        this.keys.add(key)
        this.eventStores[key] = new EventStore(this)
        this.accessStores[key] = new AccessStore(this)
    }

    /**
     * Executes side effects on each render.
     */
    effect () {
        if (this.config.shared.target) this.bind()
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

    applyProps (props: Props) {
        this.props = props
    }

    applyConfig (config: Config, key?: MidiKey) {
        const {enabled, ...other} = config
        const _config: any = {shared: {enabled}}
        if (key) {
            const target = ConfigMap.get(key)
            _config[key] = {...target, ...other}
        } else {
            eachProp(other, (v, k) => {
                const target = ConfigMap.get(k as any)
                if (target)
                    _config[k] = {...v,  ...target}
            })
        }
        this.config = _config
    }

    /**
     * The bind function that can be returned
     */
    bind (...args: any) {
        const shared = this.config.shared
        // const props: any = {}

        let target
        if (shared.target) {
            target = shared.target()
            if (!target) return
        }

        // const bindFunction = bindToProps(props, shared.eventOptions, !!target) // !!!

        if (shared.enabled) {
            each(this.keys, key => {
                if (this.config[key]!.enabled) {
                    const Engine = EngineMap.get(key)!
                    // new Engine(this, args, key)!.bind(bindFunction) // !!!
                }
            })
        }

        // if (!target) return props
        // eachProp(props, prop => {
        //     this._eventStore.add(target, eventKey, '', prop) // !!!
        // })
    }
}
