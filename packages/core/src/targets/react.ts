import React from 'react'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { EventTypes, MidiKey, Config, Prop, Props, Native } from '../types'
import { is } from '../utils'

export function useRecognizers <Config> (
    props: Props,
    config?: Config | {},
    key?: MidiKey,
    native?: Native
): Controller['bind'] | undefined

export function useRecognizers (props: any, config: any={}, key?: any, native?: any) {
    const ctrl = React.useMemo(() => new Controller(props), [])
    ctrl.applyProps(props, native)
    ctrl.applyConfig(config, key)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    return is.und(config.target)
        ? ctrl.bind.bind(ctrl)
        : undefined
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

export function useMidi (_props: any, config: any={}) {
    registerAction('button', 'fader', 'note')
    const [props, native] = parseProps(_props)
    return useRecognizers<Config>(props, config, undefined, native)
}

export function UseButton <
    EventType = EventTypes<'button'>,
    C extends Config<'button'> = Config<'button'>
> (
    props: C & {
        onButton: Prop<'button', EventType>,
        children: (bind: any) => null | JSX.Element
    }
): null | JSX.Element

export function UseButton (props: any) {
    const {children, onButton, ...config} = props
    return children(useButton(onButton, config))
}

export function UseFader <
    EventType = EventTypes<'fader'>,
    C extends Config<'fader'> = Config<'fader'>
>(
    props: C & Props & {
        onFader: Prop<'fader', EventType>,
        children: (bind: any) => null | JSX.Element
    }
): null | JSX.Element

export function UseFader (props: any) {
    const {children, onFader, ...config} = props
    return children(useFader(onFader, config))
}

export function UseNote <
    EventType = EventTypes<'fader'>,
    C extends Config<'fader'> = Config<'fader'>
>(
    props: C & Props & {
        onNote: Prop<'note', EventType>,
        children: (bind: any) => null | JSX.Element
    }
): null | JSX.Element

export function UseNote (props: any) {
    const {children, onNote, ...config} = props
    return children(useNote(onNote, config))
}

export function UseMidi <C extends Config = Config>(
    props: Props & C & {children: (bind: any) => null | JSX.Element}
): null | JSX.Element

export function UseMidi(props: any) {
    const {children, onButton, onFader, onNote, ...config} = props
    return children(useMidi({onButton, onFader, onNote}, config))
}
