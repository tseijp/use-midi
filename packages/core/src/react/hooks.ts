import React from 'react'
import { Controller } from '../Controller'
import { parseMergedEngines } from '../parser'
import { EventTypes } from '../State'
import { Engine, Engines } from '../engines'
import { registerAction, ButtonAction, FaderAction } from '../actions'
import { MIDIKey, UserFaderConfig, UserMIDIConfig, Handler, NativeHanlers, Config } from '../Config'

export type Action = any

export function useRecognizers <Config> (
    handlers: Handler,
    config?: Config | {},
    key?: MIDIKey,
    nativeHanlers?: NativeHanlers
): any

export function useRecognizers (handlers: any, config: any={}, key?: any, nativeHanlers?: any) {
    const ctrl = React.useMemo(() => new Controller(), [])
    ctrl.applyHandlers(handlers, nativeHanlers)
    ctrl.applyConfig(config, key)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    if (typeof config.target === 'undefined')
        return ctrl.bind.bind(ctrl) as any
    return undefined as any
}

export function useFader<
    EventType = EventTypes['button'],
    Config extends UserFaderConfig = UserFaderConfig
>(
    engine: Engine<'hover', EventType>,
    config?: Config | {}
): any

export function useFader (handlers: any, config: any={}) {
    registerAction(FaderAction)
    return useRecognizers({ hover: handlers }, config, 'fader')
}

export function useButton (handlers: any, config: any) {
    registerAction(ButtonAction)
    return useRecognizers({ button: handlers })
}
export function createUseMidi (actions: Action[]): {
    (_engines: Engines, _config?: Config | {}): any
}

export function createUseMidi (actions: any[]) {
    actions.forEach(registerAction)
    return (_engine: any, _config: any) => {
        const { engines, config } = parseMergedEngines(_engine, _config)
        return useRecognizers<Config>(engines, config)
    }
}

export function useMidi <Config extends UserMIDIConfig = UserMIDIConfig>(
    engines: Engines,
    config?: Config | {}
): any

export function useMidi (engines: any, config: any={}) {
    const hook = createUseMidi([FaderAction])
    return hook(engines, config)
}
