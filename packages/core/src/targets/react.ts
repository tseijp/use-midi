import React from 'react'
import { Controller } from '../Controller'
import { registerAction } from '../actions'
import { EventTypes, MidiKey, Config, Prop, Props, NativeProps } from '../types'

export function useRecognizers <Config> (
    props: Props,
    config?: Config | {},
    key?: MidiKey,
    nativeProps?: NativeProps
): Controller['bind'] | undefined

export function useRecognizers (props: any, config: any={}, key?: any) {
    const ctrl = React.useMemo(() => new Controller(props), [])
    ctrl.applyProps(props)
    ctrl.applyConfig(config, key)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    if (typeof config.target === 'undefined')
        return ctrl.bind.bind(ctrl)
    return undefined
}

export function useButton <
    EventType = EventTypes<'button'>,
    C extends Config<'button'> = Config<'button'>
> (
    button: Prop<'button', EventType>,
    config?: C | {}
): Controller['bind'] | undefined

export function useButton (onButton: any, config: any) {
    registerAction('button')
    return useRecognizers({ onButton }, config, 'button')
}

export function useFader<
    EventType = EventTypes<'button'>,
    C extends Config<'fader'> = Config<'fader'>
>(
    onFader: Prop<'fader', EventType>,
    config?: C | {}
): Controller['bind'] | undefined

export function useFader (onFader: any, config: any={}) {
    registerAction('fader')
    return useRecognizers({ onFader }, config, 'fader')
}

export function useNote<
    EventType = EventTypes<'note'>,
    C extends Config<'note'> = Config<'note'>
>(
    onNote: Prop<'note', EventType>,
    config?: C | {}
): Controller['bind'] | undefined

export function useNote (onNote: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ onNote }, config, 'note')
}

export function useMidi <C extends Config = Config> (
    props: Props,
    config?: Config | {}
): Controller['bind'] | undefined

export function useMidi (props: any, config: any={}) {
    registerAction('button', 'fader', 'note')
    return useRecognizers<Config>(props, config)
}

export function UseButton (
    props: Props & {
        children: (bind: any) => null | JSX.Element
        config: Config<'button'>
    }
): null | JSX.Element

export function UseButton (props: any) {
    const {children, config, ...other} = props
    return children(useButton(other, config))
}

export function UseFader (
    props: Props & {
        children: (bind: any) => null | JSX.Element
        config: Config<'fader'> | {}
    }
): null | JSX.Element

export function UseFader (props: any) {
    const {children, config, ...other} = props
    return children(useFader(other, config))
}

export function UseNote (
    props: Props & {
        children: (bind: any) => null | JSX.Element
        config: Config<'note'> | {}
    }
): null | JSX.Element

export function UseNote (props: any) {
    const {children, config, ...other} = props
    return children(useNote(other, config))
}

export function UseMidi (
    props: Props & {
        children: (bind: any) => null | JSX.Element
        config: Config | {}
    }
): null | JSX.Element

export function UseMidi(props: any) {
    const {children, config, ...other} = props
    return children(useMidi(other, config))
}
