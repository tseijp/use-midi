import React from 'react'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Events, MidiKey, Config, Prop, Props, NativeProps } from '../types'
import { is } from '../utils'

export function useRecognizers <Config> (
    props: Props,
    config?: Config | {},
    midiKey?: MidiKey,
    native?: NativeProps
): Controller['bind'] | undefined

export function useRecognizers (props: any, config: any={}, midiKey?: any, native?: any) {
    const ctrl = React.useMemo(() => new Controller(props), [])
    ctrl.applyProps(props, native)
    ctrl.applyConfig(config, midiKey)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    return is.und(config.target)
        ? ctrl.bind.bind(ctrl)
        : undefined
}
export function useMidi <C extends Config = Config> (
    props: Props,
    config?: Config | {}
): Controller['bind'] | undefined

export function useMidi (_props: any, config: any={}) {
    registerAction('button', 'slider', 'knob', 'note')
    const [props, native] = parseProps(_props)
    return useRecognizers<Config>(props, config, undefined, native)
}

export function useButton <
    E = Events<'button'>,
    C = Config<'button'>
> (
    button: Prop<'button', E>,
    config?: C | {}
): Controller['bind'] | undefined

export function useButton (onButton: any, config: any) {
    registerAction('button')
    return useRecognizers({ onButton }, config, 'button')
}

export function useSlider<
    E = Events<'slider'>,
    C = Config<'slider'>
>(
    onSlider: Prop<'slider', E>,
    config?: C | {}
): Controller['bind'] | undefined

export function useSlider (onSlider: any, config: any={}) {
    registerAction('slider')
    return useRecognizers({ onSlider }, config, 'slider')
}

export function useNote<
    E = Events<'note'>,
    C = Config<'note'>
>(
    onNote: Prop<'note', E>,
    config?: C | {}
): Controller['bind'] | undefined

export function useNote (onNote: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ onNote }, config, 'note')
}

export function useKnob<
    E = Events<'knob'>,
    C = Config<'knob'>
>(
    onKnob: Prop<'knob', E>,
    config?: C | {}
): Controller['bind'] | undefined

export function useKnob (onKnob: any, config: any={}) {
    registerAction('knob')
    return useRecognizers({ onKnob }, config, 'knob')
}

export function UseMidi <C extends Config = Config> (
    props: Props & { config: C, children: (bind: any) => null | JSX.Element }
): null | JSX.Element

export function UseMidi(props: any) {
    const {children, config, ...other} = props
    return children(useMidi(other, config))
}

export function UseButton <E = Events<'button'>, C = Config<'button'>> (
    props: C & { onButton: Prop<'button', E>, children: (bind: any) => null | JSX.Element }
): null | JSX.Element

export function UseButton (props: any) {
    const {children, onButton, ...config} = props
    return children(useButton(onButton, config))
}

export function UseSlider <E = Events<'slider'>, C = Config<'slider'>>(
    props: C & { onSlider: Prop<'slider', E>, children: (bind: any) => null | JSX.Element }
): null | JSX.Element

export function UseSlider (props: any) {
    const {children, onSlider, ...config} = props
    return children(useSlider(onSlider, config))
}

export function UseKnob <E = Events<'knob'>, C = Config<'knob'>>(
    props: C & { onKnob: Prop<'knob', E>, children: (bind: any) => null | JSX.Element }
): null | JSX.Element

export function UseKnob (props: any) {
    const {children, onKnob, ...config} = props
    return children(useKnob(onKnob, config))
}

export function UseNote < E = Events<'note'>, C = Config<'note'>>(
    props: C & { onNote: Prop<'note', E>, children: (bind: any) => null | JSX.Element}
): null | JSX.Element

export function UseNote (props: any) {
    const {children, onNote, ...config} = props
    return children(useNote(onNote, config))
}
