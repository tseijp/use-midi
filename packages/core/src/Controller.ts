import { MidiKey, Props, NativeProps, Config } from './types'
import { EventStore, TimeoutStore } from './stores'
import { EngineMap, ConfigMap } from './actions'
import { eachProp } from './utils'

export class Controller {
    public keys = new Set<MidiKey>()
    private _eventStore = new EventStore(this)
    private _timeoutStore = new TimeoutStore(this)
    public eventStores: { [key in MidiKey]?: EventStore } = {}
    public timeoutStores: { [key in MidiKey]?: TimeoutStore } = {}
    public engines = {}
    public props = {}
    public nativeProps = {}
    public config = {} as any
    public state = {
        shared: {}
    } as any

    constructor (props: Props) {

    }

    clean () {
        for (const key of this.keys) {
            this.eventStores[key]!.clean()
            this.timeoutStores[key]!.clean()
        }
    }

    effect () {
        if (this.config.shared.target) this.bind()
        return () => void (this._eventStore.clean(), this._timeoutStore.clean())
    }

    bind (...args: any) {

    }

    applyProps (props: Props, nativeProps?: NativeProps) {
        this.props = props
        this.nativeProps = nativeProps
    }

    applyConfig (config: Config, key?: MidiKey) {
        const {enabled, ...other} = config
        const _config: any = {shared: {enabled}}
        if (key) {
            const target = ConfigMap.get(key)
            _config[key] = {...target, ...other}
        } else {
            eachProp(other, (prop, key) => {
                const target = ConfigMap.get(key)
                if (target)
                    _config[key] = {...prop,  ...target}
            })

        }
        this.config = _config
    }
}
