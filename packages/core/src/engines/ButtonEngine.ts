import { CoordEngine } from './CoordEngine'

export class ButtonEngine extends CoordEngine<'button'> {
    ingKey = 'input'

    constructor (...args: [any, any, any]) {
        super(...args)
    }

    reset (this: ButtonEngine) {
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
