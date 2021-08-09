export  type IngKey = 'dragging' | 'moving'

export type SharedMIDIState = {
    dragging?: boolean
}

export type CommonMIDIState = {
    xy: number[]
    dxdy: number[]
}
