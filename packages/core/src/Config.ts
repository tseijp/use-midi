import {State} from './State'

export type MIDIKey = Exclude<keyof State, 'shared'>

export type Handlers = any // TODO

export type NativeHanlers = any // TODO

export interface GenericConfig {
    target?: any
    window?: any
    enabled?: boolean
}

export interface MIDIConfig {
    enables?: boolean
    channel?: number
}

export const defaultConfig: Config = {
}

export class Config {
    constructor(config: Partial<Config> = {}) {
        Object.assign(this, defaultConfig, config)
    }
}

export interface FaderConfig extends MIDIConfig {}

export type UserFaderConfig = GenericConfig & FaderConfig

export type UserMIDIConfig = GenericConfig & {
    fader?: FaderConfig
}
