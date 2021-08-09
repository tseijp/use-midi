import { registerAction, ButtonAction } from '../actions'
import { EventTypes, UserHoverConfig, Handler } from '../types'
import { useRecognizers } from './useRecognizers'

export function useHover<EventType = EventTypes['button'], Config extends UserHoverConfig = UserHoverConfig>(
  handler: Handler<'hover', EventType>,
  config: Config | {} = {}
) {
    registerAction(ButtonAction)
    return useRecognizers({ hover: handler }, config, 'hover')
}
