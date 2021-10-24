import React, { ForwardedRef as Ref, createElement as el, ReactHTML as HTML, ReactSVG as SVG, FC } from 'react'
import { is } from '../utils'
import { registerAction } from '../actions'
import { Controller, parseProps } from '../Controller'
import { Events, MidiKey, Config, Prop, Props, NativeProps } from '../types'

export type As = string | keyof HTML | keyof SVG | FC<any> | React.ClassType<any, any, any>
export type Children = null | JSX.Element | {(bind: Controller['bind'], ref: Ref<any>): null | JSX.Element}

export function useRecognizers <C extends Config=Config> (
    props: Props, config?: C | {}, key?: MidiKey, native?: NativeProps
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

export function useMidi <C extends Config=Config> (
    props: Props, config?: Config | {}
): Controller['bind'] | undefined

export function useMidi (_props: any, config: any={}) {
    registerAction('fade', 'turn', 'note')
    const [props, native] = parseProps(_props)
    return useRecognizers<Config>(props, config, undefined, native)
}

export function useFade<E=Events<'fade'>, C=Config<'fade'>>(
    fade: Prop<'fade', E>, config?: C | {}
): Controller['bind'] | undefined

export function useFade (fade: any, config: any={}) {
    registerAction('fade')
    return useRecognizers({ fade }, config, 'fade')
}

export function useNote<E=Events<'note'>, C=Config<'note'>>(
    note: Prop<'note', E>, config?: C | {}
): Controller['bind'] | undefined

export function useNote (note: any, config: any={}) {
    registerAction('note')
    return useRecognizers({ note }, config, 'note')
}

export function useTurn<E=Events<'turn'>, C=Config<'turn'>>(
    turn: Prop<'turn', E>, config?: C | {}
): Controller['bind'] | undefined

export function useTurn (turn: any, config: any={}) {
    registerAction('turn')
    return useRecognizers({ turn }, config, 'turn')
}

export const UseMidi = React.forwardRef(_UseMidi)
export const UseFade = React.forwardRef(_UseFade)
export const UseTurn = React.forwardRef(_UseTurn)
export const UseNote = React.forwardRef(_UseNote)

function _UseMidi <C extends Config=Config> (
    props: Props & { as?: As, config?: C, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseMidi(props: any, ref: any) {
    const { as, children, fade, turn, note, config, ...other } = props
    const bind = useMidi({fade, turn, note}, config)
    return as? el(as, {...bind?.(), ref, ...other}, children): children?.(bind, ref)
}

function _UseFade <E=Events<'fade'>, C=Config<'fade'>, P=Prop<'fade', E>>(
    props: C & {as?: As, fade: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseFade (props: any, ref: any) {
    const { as, children, fade, config, ...other } = props
    const bind = useFade(fade, config)
    return as? el(as, {...bind?.(), ...other, ref}, children): children?.(bind, ref)
}

function _UseTurn <E=Events<'turn'>, C=Config<'turn'>, P=Prop<'turn', E>>(
    props: C & {as?: As, turn: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseTurn (props: any, ref: any) {
    const { as, children, turn, config, ...other } = props
    const bind = useTurn(turn, config)
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
