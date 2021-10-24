import { Engine } from '../Engine'

export class FadeEngine extends Engine<'fade'> {
    _key = 'fade' as const

    // superseeds generic Engine reset call
    reset (this: FadeEngine) {
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
        bindFn('midimessage', '', this.midimessage.bind(this))
    }

    pointer(event: any) {
        this.compute(event)
    }

    midimessage (event: any) {
        if (!this.state.active)
            this.start(event)
        this.compute(event)
    }
}
