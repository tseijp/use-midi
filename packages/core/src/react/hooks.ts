import React from 'react'
import { Controller } from '../Controller'
import { parseMergedEngines } from '../parser'
import { Action, registerAction, ButtonAction, FaderAction } from '../actions'
import { EventTypes, MIDIKey, Config, Prop, Props, NativeProps } from '../types'

export function useRecognizers <Config> (
    props: Props,
    config?: Config | {},
    key?: MIDIKey,
    nativeProps?: NativeProps
): any

export function useRecognizers (props: any, config: any={}, key?: any, nativeProps?: any) {
    const ctrl = React.useMemo(() => new Controller(), [])
    ctrl.applyProps(props, nativeProps)
    ctrl.applyConfig(config, key)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    if (typeof config.target === 'undefined')
        return ctrl.bind.bind(ctrl) as any
    return undefined as any
}

export function useFader<
    EventType = EventTypes['button'],
    C extends Config<'fader'> = Config<'fader'>
>(
    fader: Prop<'fader', EventType>,
    config?: C | {}
): any

export function useFader (fader: any, config: any={}) {
    registerAction(FaderAction)
    return useRecognizers({ fader }, config, 'fader')
}

export function useButton <
    EventType = EventTypes['button'],
    C extends Config<'button'> = Config<'button'>
> (
    button: Prop<'button', EventType>,
    config?: C | {}
): any

export function useButton (button: any, config: any) {
    registerAction(ButtonAction)
    return useRecognizers({ button })
}

export function createUseMidi (actions: Action[]): {
    (_props: Props, _config?: Config | {}): any
}

export function createUseMidi (actions: any[]) {
    actions.forEach(registerAction)
    return (_engine: any, _config: any) => {
        const { engines, config } = parseMergedEngines(_engine, _config)
        return useRecognizers<Config>(engines, config)
    }
}

export function useMidi <C extends Config = Config>(
    props: Props,
    config?: Config | {}
): any

export function useMidi (props: any, config: any={}) {
    const hook = createUseMidi([FaderAction])
    return hook(props, config)
}
