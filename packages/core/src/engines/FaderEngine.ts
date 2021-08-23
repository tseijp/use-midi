import { BaseEngine } from './BaseEngine'

export class FaderEngine extends BaseEngine<'fader'> {
    _key = 'fader' as const

    bind (fn: any) {
        fn('fader', '', this.fader.bind(this))
    }

    fader (event: any) {
        const {state} = this
        if (state.active) this.faderStart(event)
        else this.faderChange(event)
        this.accessStore.add('faderEnd', this.faderEnd.bind(this))
    }

    faderStart (event: any) {
        this.start(event)
        this.compute(event)
    }

    faderChange (event: any) {
        this.compute(event)
    }

    faderEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.compute(event)
    }
}
