// ref: https://github.com/pmndrs/use-gesture/blob/main/packages/core/src/utils/events.ts

const EVENT_TYPE_MAP: any = {
    pointer: { start: 'down', change: 'move', end: 'up' },
    mouse: { start: 'down', change: 'move', end: 'up' },
    touch: { start: 'start', change: 'move', end: 'end' },
    gesture: { start: 'start', change: 'change', end: 'end' }
}

export function toDomEvent(device: string, action = '') {
    const deviceProps = EVENT_TYPE_MAP[device]
    const actionKey = deviceProps ? deviceProps[action] || action : action
    return device + actionKey
}

export function toPropEvent(device: string, action = '', capture: boolean = false) {
  const deviceProps = EVENT_TYPE_MAP[device]
  const actionKey = deviceProps ? deviceProps[action] || action : action
  return 'on' + capitalize(device) + capitalize(actionKey) + (capture ? 'Capture' : '')
}

function capitalize(string: string) {
    if (!string) return ''
    return string[0].toUpperCase() + string.slice(1)
}
