import { MidiKey, Props, NativeProps, Config } from './types'
import { UpdateStore, TimeoutStore } from './stores'
import { EngineMap, ConfigMap } from './actions'
import { eachProp } from './utils'

export class Controller {
    public keys = new Set<MidiKey>()
    private _updateStore = new UpdateStore(this)
    private _timeoutStore = new TimeoutStore(this)
    public eventStores: { [key in MidiKey]?: UpdateStore } = {}
    public timeoutStores: { [key in MidiKey]?: TimeoutStore } = {}
    public props = {}
    public config = {} as any
    public state = {
        shared: {}
    } as any

    constructor (props: Props) {
        this.props = props
    }

    clean () {
        for (const key of this.keys) {
            this.eventStores[key]!.clean()
            this.timeoutStores[key]!.clean()
        }
    }

    effect () {
        if (this.config.shared.target) this.bind()
        return () => void (this._updateStore.clean(), this._timeoutStore.clean())
    }

    bind (...args: any) {
        const sharedConfig = this.config.shared
        const props: any = {}

        let target
        if (sharedConfig.target) {
            target = sharedConfig.target()
            if (!target) return
        }

        // const bindFunction = bindToProps(props, sharedConfig.eventOptions, !!target) // !!!

        if (sharedConfig.enabled) {
            for (const key of this.keys) {
                if (this.config[key]!.enabled) {
                    const Engine = EngineMap.get(key)!
                    // new Engine(this, args, key)!.bind(bindFunction) // !!!
                }
            }
        }

        // if (!target) return props
        // for (const handlerProp in props) {
        //     this._targetStore.add(target, eventKey, '', props[handlerProp],) // !!!
        // }
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
}
