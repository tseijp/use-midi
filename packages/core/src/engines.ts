import { Engine } from './Engine'

const { abs } = Math
export class ButtonEngine extends Engine<'button'> {
    _key = 'button' as const

    bind (bindFn: any) {
        // const device = this.config.device // mouse | pointer | touch
        bindFn('midimessage', '', this.button.bind(this))
        bindFn('pointer', 'down', this.enter.bind(this), true)
        bindFn('pointer', 'up', this.leave.bind(this), true)
    }

    enter(event: PointerEvent) {
        this.start(event)
        this.state.values =  [event.clientX, event.clientY]
        this.compute(event)
        // this.emit()
    }

    leave(event: PointerEvent) {
        const { state } = this
        if (!state.active) return
        state.active = false

        const {clientX: x, clientY: y} = event
        const [preX, preY] = state.values
        state.movement = state.delta = [x - preX, y - preY]
        state.values = [x, y]
        this.compute(event)
        state.delta = state.movement
    }
    button (event: any) {
        this.compute(event)
    }
}

export class SliderEngine extends Engine<'slider'> {
    _key = 'slider' as const

    // superseeds generic Engine reset call
    reset (this: SliderEngine) {
        super.reset()
        const { state } = this
        state.swipe = [0, 0]
        state.tap = false
        state.canceled = false
    }

    pointerDown (event: PointerEvent) {
        const { state } = this
        this.start(event)
        state.values = [event.clientX, event.clientY]
        state.initial = state.values
        this.compute(event)
    }

    pointerMove (event: PointerEvent) {
        const { state } = this
        const {clientX: x, clientY: y} = event
        const [px, py] = state.values
        const [mx, my] = state.movements
        const [dx, dy] = [x - px, y - py]
        state.delta = [dx, dy]
        state.values = [x, y]
        state.movements = [mx + dx, my + my]
        this.compute(event)
    }

    pointerUp (event: PointerEvent) {
        const { state } = this
        this.compute(event)
        const [dx, dy] = state.distance
        state.tap = dx <= 3 && dy <= 3
    }

    bind (bindFn: any) {
        const device = this.config.shared.device // mouse | pointer | touch
        bindFn(device, 'start', this.pointerDown.bind(this), true)
        bindFn(device, 'change', this.pointerMove.bind(this))
        bindFn(device, 'cancel', this.pointerUp.bind(this))
        bindFn(device, 'end', this.pointerUp.bind(this))
        bindFn('midimessage', '', this.pointerMove.bind(this))
        bindFn('midimessage', '', this.pointerDown.bind(this))
    }

    pointer(event: any) {
        this.compute(event)
    }

    slider (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}

export class KnobEngine extends Engine<'knob'> {
    _key = 'knob' as const

    bind (bindFn: any) {
        bindFn('midimessage', '', this.knob.bind(this))
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
        bindFn('midimessage', '', this.note.bind(this))
    }

    note (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}
