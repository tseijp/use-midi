import { Engine } from './Engine'

export class ButtonEngine extends Engine<'button'> {
    _key = 'button' as const

    bind (bindFn: any) {
        bindFn('midimessage', this.button.midimessage(this))
    }

    midimessage (event: any) {
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
        bindFn('midimessage', this.fader.bind(this))
    }

    fader (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
        // this.timeoutStore.add('faderEnd', this.faderEnd.bind(this))
    }

    faderEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.state.last = true
        this.compute(event)
    }
}

export class NoteEngine extends Engine<'note'> {
    _key = 'note' as const

    bind (bindFn: any) {
        bindFn('midimessage', this.note.bind(this))
    }

    note (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
        // this.timeoutStore.add('noteEnd', this.noteEnd.bind(this))
    }

    noteEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.state.last = true
        this.compute(event)
    }
}
