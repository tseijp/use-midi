import {
    Action,
    GestureKey,
    EngineClass,
    ResolverMap
} from './types'

export const EngineMap = new Map<GestureKey, EngineClass<any>>()
export const ConfigResolverMap = new Map<GestureKey, ResolverMap>()

export function registerAction(action: Action) {
    EngineMap.set(action.key, action.engine)
    ConfigResolverMap.set(action.key, action.resolver)
}
