import { createUseMidi } from './createUseMidi'
import {
    UserGestureConfig,
    GestureHandlers
} from '../types'

export function useMidi <Config extends UserGestureConfig = UserGestureConfig>(
    handlers: GestureHandlers,
    config: Config | {} = {}
) {
    const hook = createUseMidi([])
    return hook(handlers, config)
}
