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

export function useButton <
    EventType = EventTypes['button'],
    C extends Config<'button'> = Config<'button'>
> (
    button: Prop<'button', EventType>,
    config?: C | {}
): any

export function useButton (onButton: any, config: any) {
    registerAction('button')
    return useRecognizers({ onButton }, config, 'button')
}

export function useFader<
    EventType = EventTypes['button'],
    C extends Config<'fader'> = Config<'fader'>
>(
    onFader: Prop<'fader', EventType>,
    config?: C | {}
): any

export function useFader (onFader: any, config: any={}) {
    registerAction('fader')
    return useRecognizers({ onFader }, config, 'fader')
}

export function useNote<
    EventType = EventTypes['note'],
    C extends Config<'note'> = Config<'note'>
>(
    onNote: Prop<'note', EventType>,
    config?: C | {}
): any

export function useNote (onNote: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ onNote }, config, 'note')
}

export function useMidi <C extends Config = Config> (
    props: Props,
    config?: Config | {}
): any

export function useMidi (props: any, config: any={}) {
    registerAction('button', 'fader', 'note')
    return useRecognizers<Config>(props, config)
}

export function UseFader <State extends object> (
    props: Props & {
        children: (bind: any) => JSX.Element | null
        config: Config | {}
    }
): JSX.Element | null

export function UseFader (props: any) {
    const {children, config, ...other} = props
    return children(useFader(other, config))
}

export function UseMidi <State extends object> (
    props: Props & {
        children: (bind: any) => JSX.Element | null
        config: Config | {}
    }
): JSX.Element | null

export function UseMidi(props: any) {
    const {children, config, ...other} = props
    return children(useMidi(other, config))
}
