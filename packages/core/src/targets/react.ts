import React, { ForwardedRef as Ref, createElement as el, ReactHTML as HTML, ReactSVG as SVG, FC } from 'react'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Events, MidiKey, Config, Prop, Props, NativeProps } from '../types'
import { is } from '../utils'

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

export function useButton (onButton: any, config: any) {
    registerAction('button')
    return useRecognizers({ onButton }, config, 'button')
}

export function useSlider<E=Events<'slider'>, C=Config<'slider'>>(
    onSlider: Prop<'slider', E>, config?: C | {}
): Controller['bind'] | undefined

export function useSlider (onSlider: any, config: any={}) {
    registerAction('slider')
    return useRecognizers({ onSlider }, config, 'slider')
}

export function useNote<E=Events<'note'>, C=Config<'note'>>(
    onNote: Prop<'note', E>, config?: C | {}
): Controller['bind'] | undefined

export function useNote (onNote: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ onNote }, config, 'note')
}

export function useKnob<E=Events<'knob'>, C=Config<'knob'>>(
    onKnob: Prop<'knob', E>, config?: C | {}
): Controller['bind'] | undefined

export function useKnob (onKnob: any, config: any={}) {
    registerAction('knob')
    return useRecognizers({ onKnob }, config, 'knob')
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
    const { as, children, onButton, onSlider, onKnob, onNote, config, ...other } = props
    const bind = useMidi({onButton, onSlider, onKnob, onNote}, config)
    return as? el(as, {...bind?.(), ref, ...other}, children): children?.(bind, ref)
}

function _UseButton <E=Events<'button'>, C=Config<'button'>, P=Prop<'button', E>>(
    props: C & {as?: As, onButton: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseButton (props: any, ref: any) {
    const { as, children, onButton, config, ...other } = props
    const bind = useButton(onButton, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseSlider <E=Events<'slider'>, C=Config<'slider'>, P=Prop<'slider', E>>(
    props: C & {as?: As, onSlider: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseSlider (props: any, ref: any) {
    const { as, children, onSlider, config, ...other } = props
    const bind = useSlider(onSlider, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseKnob <E=Events<'knob'>, C=Config<'knob'>, P=Prop<'knob', E>>(
    props: C & {as?: As, onKnob: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseKnob (props: any, ref: any) {
    const { as, children, onKnob, config, ...other } = props
    const bind = useKnob(onKnob, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseNote <E=Events<'note'>, C=Config<'note'>, P=Prop<'note', E>>(
    props: C & {as?: As, onNote: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseNote (props: any, ref: any) {
    const { as, children, onNote, config, ...other } = props
    const bind = useNote(onNote, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}
