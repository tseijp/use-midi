import React, { ForwardedRef as Ref, createElement as el } from 'react'
import { MidiKey, Config, Props } from '../types'
import { Controller } from '../Controller'
import { Any } from '../rma'
import { is } from '../utils'

type As<Props extends Any=Any> =
    | string
    | keyof React.ReactHTML
    | keyof React.ReactSVG
    | React.FC<Props>

/**
 * React hooks
 */
export function useRecognizers <
    P extends Props=Props,
    C extends Config=Config
> (
    props: Partial<P>,
    config?: Partial<C>,
    ...keys: MidiKey[]
): Controller['bind'] {
    const ctrl = React.useMemo(() => new Controller(props), [])
    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])
    return ctrl.apply(props, config, ...keys)
}

export function useMidi <
    P extends Props=Props,
    C extends Config=Config
> (
    props: Partial<P>,
    config: Partial<C>={}
): Controller['bind'] {
    return useRecognizers<P, C>(props, config, 'fade', 'turn', 'note')
}

export function useFade<C=Config<'fade'>>(
    fade: Props<'fade'>,
    config: Partial<C> = {}
): Controller['bind'] {
    return useRecognizers({ fade }, config, 'fade')
}

export function useNote<C=Config<'note'>>(
    note: Props<'note'>,
    config: Partial<C> = {}
): Controller['bind'] {
    return useRecognizers({ note }, config, 'note')
}

export function useTurn<C=Config<'turn'>>(
    turn: Props<'turn'>,
    config: Partial<C>={}
): Controller['bind'] {
    return useRecognizers({ turn }, config, 'turn') as Controller['bind']
}

/**
 * React Compornents with hooks
 */
export const UseMidi = React.forwardRef(_UseMidi)
export const UseFade = React.forwardRef(_UseFade)
export const UseTurn = React.forwardRef(_UseTurn)
export const UseNote = React.forwardRef(_UseNote)

export type UseMidiProps<
    P extends Props=Props,
    C extends Config=Config
> = C & Partial<P> & { config: C } & { as: As, children?: null | JSX.Element }

function _UseMidi  (props: UseMidiProps, ref: Ref<Any>) {
    const { as, children, fade, turn, note, config, ...other } = props
    const bind = useMidi({fade, turn, note}, as? config: {...other, ...config})
    // @ts-ignore
    return is.und(as)? children(bind, ref):  el(as, {...bind(), ref, ...other}, children)
}

export type UseFadeProps<
    P=Props<'fade'>,
    C=Config<'fade'>
> = C & {fade: P, as: As, config?: Partial<C>, children?: null | JSX.Element}

function _UseFade (props: UseFadeProps, ref: Ref<Any>) {
    const { fade, as, config={}, children, ...other } = props
    const bind = useFade(fade, as? config: {...other, ...config})
    // @ts-ignore
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}

export type UseTurnProps<
    P=Props<'turn'>,
    C=Config<'turn'>
> = C & { turn: P, as: As, config?: Partial<C>, children?: null | JSX.Element }

function _UseTurn(props: UseTurnProps, ref: Ref<Any>) {
    const { as, children, turn, config={}, ...other } = props
    const bind = useTurn(turn, as? config: {...other, ...config})
    // @ts-ignore
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}

export type UseNoteProps<
    P=Props<'note'>,
    C=Config<'note'>
> = C & { as: As, note: P, config?: Partial<C>, children?: null | JSX.Element }

function _UseNote (props: UseNoteProps, ref: Ref<Any>) {
    const { as, children, note, config={}, ...other } = props
    const bind = useNote(note, as? config: {...other, ...config})
    // @ts-ignore
    return as? el(as, {...bind(), ...other, ref}, children): children?.(bind, ref)
}
