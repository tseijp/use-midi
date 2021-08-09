export interface Lookup<T = any> {
    [key: string]: T
}

export class Any {
    private _: never
}

export type MIDIKey =
    | 'button'
    | 'fader'
    | 'grid'
    | 'note'
    | 'program'
