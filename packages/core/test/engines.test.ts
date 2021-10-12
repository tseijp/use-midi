import { each, Controller, ButtonEngine, FaderEngine, NoteEngine } from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const event = {target: {}, data: [0, 0, 0]}

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.applyConfig({})
        ctrl.applyProps({onButton: fn, onFader: fn, onNote: fn})
    })

    it.each`
        index     | Engine          | bindFn
      ${'button'} | ${ButtonEngine} | ${['button', 'buttonEnd']}
      ${'fader'}  | ${FaderEngine}  | ${['fader', 'faderEnd']}
      ${'note'}   | ${NoteEngine}   | ${['note', 'noteEnd']}
    `('engine: $index', ({index, Engine, bindFn}) => {
        const engine = new Engine(ctrl, [], index)
        each(bindFn, (key: any) => engine[key](event))
        expect(engine).toBeTruthy()
    })
})
