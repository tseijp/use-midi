import {
    useMemo,
    useState,
    Suspense,
    createElement as el,
    FunctionComponent as FC,
    ComponentClass as CC
} from 'react'
import { eachProp, Lookup } from '../utils'
import {continueRender, delayRender} from 'remotion'

export function LowHigh <
    Props extends Lookup = Lookup,
>(props: Partial<Props & {
    children: null | JSX.Element
    low: unknown | string | FC<Partial<Props>> | CC<Partial<Props>, any>
    high: unknown | string | FC<Partial<Props>> | CC<Partial<Props>, any>
    args: Partial<Props>[]
    fallback: any
    disable: boolean
}>): null | JSX.Element

export function LowHigh (props: Lookup) {
    if (props.disable) return null
        const { low, high, fallback=null, args=[{}, {}], ...other } = props
    const [handle] = useState(() => {
        setTimeout(() => continueRender(handle), 24000)
        return delayRender()
    })

    const _args = useMemo(() => {
        eachProp(other, (prop, key) => {
            const il = key.indexOf('-low')
            const ih = key.indexOf('-high')
            if (!(~il || ~ih || key)) return
            else if (~il) args[0][key.slice(0, il)] = prop
            else if (~ih) args[1][key.slice(0, ih)] = prop
            else if (key) args[0][key] = args[1][key] = prop
        })
        return args
    }, [args, other])

    const lowEl = low? el(Suspense, {fallback}, el(low, _args[0])): null
    return high? el(Suspense, {fallback: lowEl}, el(high, _args[1])): lowEl
}
