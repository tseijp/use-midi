import React from 'react'
import { Controller } from '../Controller'
import { registerAction } from '../actions'
import { EventTypes, MidiKey, Config, Prop, Props, NativeProps } from '../types'

export function useRecognizers <Config> (
    props: Props,
    config?: Config | {},
    key?: MidiKey,
    nativeProps?: NativeProps
): any

export function useRecognizers (props: any, config: any={}, key?: any, nativeProps?: any) {
    const ctrl = React.useMemo(() => new Controller(props), [])
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
    UserConfig extends Config<'fader'> = Config<'fader'>
>(
    fader: Prop<'fader', EventType>,
    config?: UserConfig | {}
): any

export function useFader (fader: any, config: any={}) {
    registerAction('fader')
    return useRecognizers({ fader }, config, 'fader')
}

export function useButton <
    EventType = EventTypes['button'],
    UserConfig extends Config<'button'> = Config<'button'>
> (
    button: Prop<'button', EventType>,
    config?: UserConfig | {}
): any

export function useButton (button: any, config: any) {
    registerAction('button')
    return useRecognizers({ button }, config, 'button')
}

export function useMidi <UserConfig extends Config = Config>(
    props: Props,
    config?: Config | {}
): any

export function useMidi (props: any, config: any={}) {
    registerAction('button', 'fader', 'note')
    return useRecognizers<Config>(props, config)
}

export function Fader <State extends object>(
    props: Props & {
        children: (bind: any) => JSX.Element | null
        config: Config | {}
    }
): JSX.Element | null

export function Fader (props: any) {
    const {children, config, ...other} = props
    return children(useFader(other, config))
}


export function Midi<State extends object>(
    props: Props & {
        children: (bind: any) => JSX.Element | null
        config: Config | {}
    }
): JSX.Element | null

export function Midi(props: any) {
    const {children, config, ...other} = props
    return children(useMidi(other, config))
}
