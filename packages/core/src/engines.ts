import { Engine } from './Engine'

export class ButtonEngine extends Engine<'button'> {
    _key = 'button' as const

    bind (bindFn: any) {
        const device = this.config.device // mouse | pointer | touch
        bindFn(device, 'start', this.pointer.bind(this), true)
        bindFn('midi', 'message', this.button.bind(this))
    }

    pointer(event: any) {
        this.compute(event)
    }

    button (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
        // this.timeoutStore.add('buttonEnd', this.buttonEnd.bind(this))
    }

    buttonEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.state.last = true
        this.compute(event)
    }
}

export class FaderEngine extends Engine<'fader'> {
    _key = 'fader' as const

    bind (bindFn: any) {
        const device = this.config.device // mouse | pointer | touch
        bindFn(device, 'start', this.pointer.bind(this))
        bindFn('midi', 'message', this.fader.bind(this))
    }

    pointer(event: any) {
        this.compute(event)
    }

    fader (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
        // this.timeoutStore.add('faderEnd', this.faderEnd.bind(this))
    }
}

export class KnobEngine extends Engine<'knob'> {
    _key = 'knob' as const

    bind (bindFn: any) {
        bindFn('midi', 'message', this.knob.bind(this))
        bindFn('state', 'change', (e: any) => console.log(e))
    }

    knob (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}

export class NoteEngine extends Engine<'note'> {
    _key = 'note' as const

    bind (bindFn: any) {
        bindFn('midi', 'message', this.note.bind(this))
        bindFn('state', 'change', (e: any) => console.log(e))
    }

    note (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}
