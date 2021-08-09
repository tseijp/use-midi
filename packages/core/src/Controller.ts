import { MIDIKey, Handlers, NativeHanlers, UserMIDIConfig, Config } from './Config'
import { EventStore, TimeoutStore } from './stores'
import { EngineMap, ConfigMap } from './actions'
import { eachProp } from './utils'

export class Controller {
    public keys = new Set<MIDIKey>()
    private _eventStore = new EventStore(this)
    private _timeoutStore = new TimeoutStore(this)
    public eventStores: { [key in MIDIKey]?: EventStore } = {}
    public timeoutStores: { [key in MIDIKey]?: TimeoutStore } = {}
    public engines = {}
    public handlers = {}
    public nativeHandlers = {}
    public config = {} as any
    public state = {
        shared: {}
    } as any

    constructor () {
        
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

    applyHandlers (handlers: Handlers, nativeHandlers?: NativeHanlers) {
        this.handlers = handlers
        this.nativeHandlers = nativeHandlers
    }

    applyConfig (config: UserMIDIConfig, key?: MIDIKey) {
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
