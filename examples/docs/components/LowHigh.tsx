import {
    useMemo,
    useState,
    Suspense,
    createElement as el,
    FunctionComponent as FC,
    ComponentClass as CC
} from 'react'
import { Any, eachProp } from 'use-midi/src'

type LowHighProps<Props extends Any = Any> = Partial<Props & {
    children: null | JSX.Element
    low: string | FC<Partial<Props>> | CC<Partial<Props>, Any>
    high: string | FC<Partial<Props>> | CC<Partial<Props>, Any>
    args: Partial<Props>[]
    fallback: Any
    disable: boolean
}>

export function LowHigh (props: LowHighProps) {
    if (props.disable) return null
    const { low, high, fallback=null, args=[], ...other } = props
    const _args = useMemo(() => {
        const [arg0={}, arg1={}] = args
        eachProp(other, (prop, key) => {
            const il = key.indexOf('-low')
            const ih = key.indexOf('-high')
            if (!(~il || ~ih || key)) return
            if (!~il || key) setHidden(arg0, ~il? key: key.slice(0, il), prop)
            if (!~ih || key) setHidden(arg1, ~ih? key: key.slice(0, il), prop)
        })
        return [arg0, arg1]
    }, [args, other])

    const lowEl = low? el(Suspense, {fallback}, el(low, _args[0])): null
    return high? el(Suspense, {fallback: lowEl}, el(high, _args[1])): lowEl
}

function setHidden (target: unknown, key: string, prop: unknown) {
    Object.defineProperty(target, key, {
        get () { return prop }
    })
}
