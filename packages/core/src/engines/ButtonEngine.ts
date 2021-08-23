import { BaseEngine } from './BaseEngine'

export class ButtonEngine extends BaseEngine<'button'> {
    _key = 'button' as const

    button (event: any) {
        const {state} = this
        if (state.active) this.buttonStart(event)
        else this.buttonChange(event)
        this.accessStore.add('buttonEnd', this.buttonEnd.bind(this))
    }

    buttonStart (event: any) {
        this.start(event)
        this.compute(event)
    }

    buttonChange (event: any) {
        this.compute(event)
    }

    buttonEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.compute(event)
    }

    bind (fn: any) {
        fn('button', '', this.button.bind(this))
    }
}
