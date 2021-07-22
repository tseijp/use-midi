import React from 'react'
import { Controller } from '../Controller'
import {
    GestureKey,
    NativeHanlers
} from '../types'

export function useRecognizers <Config> (
    handlers: any,
    config: Config | {} = {},
    gestureKey?: GestureKey,
    nativeHanlers?: NativeHanlers
) {
    const ctrl = React.useMemo(() => new Controller(handlers), [])
    ctrl.applyHandlers(handlers, nativeHanlers)
    ctrl.applyConfig(config, gestureKey)

    React.useEffect(ctrl.effect.bind(ctrl))

    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    if (typeof config.target === 'undefined')
        return ctrl.bind.bind(ctrl) as any
    return undefined as any
}
