import {useMidi} from './hooks'
import {Props, Config} from '../types'

export type MidiComponentProps = unknown & Props & {
    children: (bind: any) => JSX.Element | null
    config: Config | {}
}

export function Midi<State extends object>(
    props: MidiComponentProps
): JSX.Element | null

export function Midi(props: any) {
    const {children, config = {},  ...engines} = props
    return children(useMidi({config, ...engines}))
}
