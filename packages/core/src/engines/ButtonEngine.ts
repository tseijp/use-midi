import { BaseEngine } from './BaseEngine'

export class ButtonEngine extends BaseEngine<'button'> {
    ingKey = 'button' as const

    button (event: any) {
        const {state} = this
        if (state._active) this.buttonStart(event)
        else this.buttonChange(event)
        this.timeoutStore.add('buttonEnd', this.buttonEnd.bind(this))
    }

    buttonStart (event: any) {
        this.start(event)
        this.compute(event)
        this.emit()
    }

    buttonChange (event: any) {
        this.compute(event)
        this.emit()
    }

    buttonEnd (event?: any) {
        if (!this.state._active) return
        this.state._active = false
        this.compute(event)
        this.emit()
    }

    bind (fn: any) {
        fn('button', '', this.button.bind(this))
    }
}
