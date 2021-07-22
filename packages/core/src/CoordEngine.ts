import { BaseEngine } from './BaseEngine'
import { CoordinatesKey, Vector2 } from '../types'


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

    intent(v: Vector2) {
        this.state.axis = this.state.axis || selectAxis(v)

        this.state._blocked =
            ((this.config.lockDirection || !!this.config.axis) && !this.state.axis) ||
            (!!this.config.axis && this.config.axis !== this.state.axis)

        if (this.state._blocked) return
    }
}
