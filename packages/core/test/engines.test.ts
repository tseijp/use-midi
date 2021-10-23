import { each, Controller, ButtonEngine, SliderEngine, KnobEngine, NoteEngine } from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const event = {target: {}, data: [0, 0, 0]}

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.applyConfig({})
        ctrl.applyProps({button: fn, slider: fn, note: fn})
    })

    it.each`
        index       | Engine          | bindFns
        ${'button'} | ${ButtonEngine} | ${['midimessage']}
        ${'slider'} | ${SliderEngine} | ${['midimessage']}
        ${'knob'}   | ${KnobEngine}   | ${['midimessage']}
        ${'note'}   | ${NoteEngine}   | ${['midimessage']}
    `('engine: $index', ({index, Engine, bindFns}) => {
        const engine = new Engine(ctrl, [], index)
        each(bindFns, (key: any) => engine[key](event))
        expect(engine).toBeTruthy()
    })
})
