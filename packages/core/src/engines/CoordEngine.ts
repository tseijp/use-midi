import { BaseEngine } from './BaseEngine'
import { CoordinatesKey } from '../types'


export abstract class CoordEngine<Key extends CoordinatesKey> extends BaseEngine<Key> {
    aliasKey = 'xy'

    reset() {
        super.reset()
        this.state.axis = undefined
    }

    init() {
        this.state.offset = [0, 0]
        this.state.lastOffset = [0, 0]
    }

    intent(v: any) {
        const {state} = this
        this.state.axis = this.state.axis || selectAxis(v)

        if (this.state._blocked) return
    }
}
