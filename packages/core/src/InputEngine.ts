import { CoordEngine } from './CoordEngine'

export class InputEngine extends CoordEngine<'input'> {
    ingKey = 'input'

    constructor (...args: [any, any, any]) {
        super(...args)
    }

    reset (this: InputEngine) {
        super.reset()
        const {state} = this
        // state.xxx = false
    }
    setup () {

    }

    cancel () {

    }

    clean () {
        super.clean()
    }

    bind (fn: any) {
        const {device} = this.config
        // fn('xxx', 'YYY', this.xxxYYY.bind(this))
    }
}
