import { useRecognizers } from './useRecognizers'
import { registerAction } from '../registerAction'
import { parseMergedHandlers } from '../parseMergedHandlers'
import {
    Action,
    Config
} from '../types'

export function createUseMidi (actions: Action[]): (
    _handlers: GestureHandlers,
    _config: Config | {} = {},
) => any

export function createUseMidi (actions: any[]) {
    actions.forEach(registerAction)
    return (...args: any) => {
        const { handlers, config } = parseMergedHandlers(...args)
        return useRecognizers<Config>(handlers, config)
    }
}
