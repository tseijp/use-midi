/**
 * ref: https://github.com/pmndrs/use-gesture/blob/main/packages/core/src/utils/events.ts
 */
type EventTypeMap = {[key in EventTypeKey]: EventType}
type EventTypeKey = 'pointer' | 'mouse' | 'touch' | 'gesture'
type EventType = {
    start: 'down' | 'start'
    change: 'move' | 'change'
    end: 'end' | 'up'
}

const EVENT_TYPE_MAP: EventTypeMap = {
    pointer: { start: 'down', change: 'move', end: 'up' },
    mouse: { start: 'down', change: 'move', end: 'up' },
    touch: { start: 'start', change: 'move', end: 'end' },
    gesture: { start: 'start', change: 'change', end: 'end' }
}

export function toDomEvent(device='', action = '') {
    const props = EVENT_TYPE_MAP[device as EventTypeKey]
    const key = props ? props[action as keyof EventType] || action : action
    return device + key
}

export function toPropEvent(device = '', action = '', capture: boolean = false) {
    const props = EVENT_TYPE_MAP[device as EventTypeKey]
    const key = props ? props[action as keyof EventType] || action : action
    return 'on' + capitalize(device) + capitalize(key) + (capture ? 'Capture' : '')
}

function capitalize(string: string) {
    if (!string) return ''
    return string[0].toUpperCase() + string.slice(1)
}
