import { each, Controller, ButtonEngine, SliderEngine, KnobEngine, NoteEngine } from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const event = {target: {}, data: [0, 0, 0]}

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.applyConfig({})
        ctrl.applyProps({onButton: fn, onSlider: fn, onNote: fn})
    })

    it.each`
        index     | Engine          | bindFns
      ${'button'} | ${ButtonEngine} | ${['button']}
      ${'slider'} | ${SliderEngine} | ${['slider']}
      ${'knob'}   | ${KnobEngine}   | ${['knob']}
      ${'note'}   | ${NoteEngine}   | ${['note']}
    `('engine: $index', ({index, Engine, bindFns}) => {
        const engine = new Engine(ctrl, [], index)
        each(bindFns, (key: any) => engine[key](event))
        expect(engine).toBeTruthy()
    })
})
