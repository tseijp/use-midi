import { BaseEngine } from './BaseEngine'

export class FaderEngine extends BaseEngine<'fader'> {
    ingKey = 'fader' as const

    fader (event: any) {
        const {state} = this
        if (state._active) this.faderStart(event)
        else this.faderChange(event)
        this.timeoutStore.add('faderEnd', this.faderEnd.bind(this))
    }

    faderStart (event: any) {
        this.start(event)
        this.compute(event)
        this.emit()
    }

    faderChange (event: any) {
        this.compute(event)
        this.emit()
    }

    faderEnd (event?: any) {
        if (!this.state._active) return
        this.state._active = false
        this.compute(event)
        this.emit()
    }

    bind (fn: any) {
        fn('fader', '', this.fader.bind(this))
    }
}
