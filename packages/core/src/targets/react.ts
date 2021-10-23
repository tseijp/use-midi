import React, { ForwardedRef as Ref, createElement as el, ReactHTML as HTML, ReactSVG as SVG, FC } from 'react'
import { is } from '../utils'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Events, MidiKey, Config, Prop, Props, NativeProps } from '../types'

export type As = string | keyof HTML | keyof SVG | FC<any> | React.ClassType<any, any, any>
export type Children = null | JSX.Element | {(bind: Controller['bind'], ref: Ref<any>): null | JSX.Element}

export function useRecognizers <C extends Config=Config> (
    props: Props,
    config?: C | {},
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

export function useMidi <C extends Config=Config> (
    props: Props, config?: Config | {}
): Controller['bind'] | undefined

export function useMidi (_props: any, config: any={}) {
    registerAction('button', 'slider', 'knob', 'note')
    const [props, native] = parseProps(_props)
    return useRecognizers<Config>(props, config, undefined, native)
}

export function useButton <E=Events<'button'>, C=Config<'button'>> (
    button: Prop<'button', E>, config?: C | {}
): Controller['bind'] | undefined

export function useButton (button: any, config: any) {
    registerAction('button')
    return useRecognizers({ button }, config, 'button')
}

export function useSlider<E=Events<'slider'>, C=Config<'slider'>>(
    slider: Prop<'slider', E>, config?: C | {}
): Controller['bind'] | undefined

export function useSlider (slider: any, config: any={}) {
    registerAction('slider')
    return useRecognizers({ slider }, config, 'slider')
}

export function useNote<E=Events<'note'>, C=Config<'note'>>(
    note: Prop<'note', E>, config?: C | {}
): Controller['bind'] | undefined

export function useNote (note: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ note }, config, 'note')
}

export function useKnob<E=Events<'knob'>, C=Config<'knob'>>(
    knob: Prop<'knob', E>, config?: C | {}
): Controller['bind'] | undefined

export function useKnob (knob: any, config: any={}) {
    registerAction('knob')
    return useRecognizers({ knob }, config, 'knob')
}

export const UseMidi   = React.forwardRef(_UseMidi)
export const UseButton = React.forwardRef(_UseButton)
export const UseSlider = React.forwardRef(_UseSlider)
export const UseKnob   = React.forwardRef(_UseKnob)
export const UseNote   = React.forwardRef(_UseNote)

function _UseMidi <C extends Config=Config> (
    props: Props & { as?: As, config?: C, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseMidi(props: any, ref: any) {
    const { as, children, button, slider, knob, note, config, ...other } = props
    const bind = useMidi({button, slider, knob, note}, config)
    return as? el(as, {...bind?.(), ref, ...other}, children): children?.(bind, ref)
}

function _UseButton <E=Events<'button'>, C=Config<'button'>, P=Prop<'button', E>>(
    props: C & {as?: As, button: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseButton (props: any, ref: any) {
    const { as, children, button, config, ...other } = props
    const bind = useButton(button, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseSlider <E=Events<'slider'>, C=Config<'slider'>, P=Prop<'slider', E>>(
    props: C & {as?: As, slider: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseSlider (props: any, ref: any) {
    const { as, children, slider, config, ...other } = props
    const bind = useSlider(slider, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseKnob <E=Events<'knob'>, C=Config<'knob'>, P=Prop<'knob', E>>(
    props: C & {as?: As, knob: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseKnob (props: any, ref: any) {
    const { as, children, knob, config, ...other } = props
    const bind = useKnob(knob, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseNote <E=Events<'note'>, C=Config<'note'>, P=Prop<'note', E>>(
    props: C & {as?: As, note: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseNote (props: any, ref: any) {
    const { as, children, note, config, ...other } = props
    const bind = useNote(note, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}
