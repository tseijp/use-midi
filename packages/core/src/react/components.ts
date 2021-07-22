import {useMidi} from './useMidi'
import {
    Config,
    GestureHandlers
} from '../types'

export type MidiComponentProps = unknown & GestureHandlers & {
    children: (bind: any) => JSX.Element | null
    config: Config | {}
}


export function Midi<State extends object>(
    props: MidiComponentProps
): JSX.Element | null

export function Midi(props: any) {
    const {children, config = {},  ...handlers} = props
    return children(useMidi({config, ...handlers}))
}
