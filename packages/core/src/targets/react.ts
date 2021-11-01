import React, { ForwardedRef as Ref, createElement as el, ReactHTML as HTML, ReactSVG as SVG, FC } from 'react'
import { Controller } from '../Controller'
import { Events, MidiKey, Config, Prop, Props } from '../types'

export type As = string | keyof HTML | keyof SVG | FC<any> | React.ClassType<any, any, any>
export type Children = null | JSX.Element | {(bind: Controller['bind'], ref: Ref<any>): null | JSX.Element}

export function useRecognizers <C extends Config=Config> (
    props: Props, config?: C | {}, ...keys: MidiKey[]
): Controller['bind']

export function useRecognizers (props: any, config?: any, ...keys: any[]) {
    const ctrl = React.useMemo(() => new Controller(props), [])
    ctrl.apply(props, config, ...keys)
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])
    if (!config.target)
        return ctrl.bind.bind(ctrl)
}

export function useMidi <C extends Config=Config> (
    props: Props, config?: Config | {}
): Controller['bind']

export function useMidi (props: any, config: any={}) {
    return useRecognizers<Config>(props, config, 'fade', 'turn', 'note')
}

export function useFade<E=Events<'fade'>, C=Config<'fade'>>(
    fade: Prop<'fade', E>, config?: C | {}
): Controller['bind']

export function useFade (fade: any, config: any={}) {
    return useRecognizers({ fade }, config, 'fade')
}

export function useNote<E=Events<'note'>, C=Config<'note'>>(
    note: Prop<'note', E>, config?: C | {}
): Controller['bind']

export function useNote (note: any, config: any={}) {
    return useRecognizers({ note }, config, 'note')
}

export function useTurn<E=Events<'turn'>, C=Config<'turn'>>(
    turn: Prop<'turn', E>, config?: C | {}
): Controller['bind']

export function useTurn (turn: any, config: any={}) {
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
    return as? el(as, {...bind(), ref, ...other}, children): children?.(bind, ref)
}

function _UseFade <E=Events<'fade'>, C=Config<'fade'>, P=Prop<'fade', E>>(
    props: C & {as?: As, fade: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseFade (props: any, ref: any) {
    const { as, children, fade, config, ...other } = props
    const bind = useFade(fade, config)
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}

function _UseTurn <E=Events<'turn'>, C=Config<'turn'>, P=Prop<'turn', E>>(
    props: C & {as?: As, turn: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseTurn (props: any, ref: any) {
    const { as, children, turn, config, ...other } = props
    const bind = useTurn(turn, config)
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}

function _UseNote <E=Events<'note'>, C=Config<'note'>, P=Prop<'note', E>>(
    props: C & {as?: As, note: P, children?: Children}, ref: Ref<any>
): null | JSX.Element

function _UseNote (props: any, ref: any) {
    const { as, children, note, config, ...other } = props
    const bind = useNote(note, config)
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}
