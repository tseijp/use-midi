import { each, Controller } from 'use-midi/src'
import * as SRC from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const event = {target: {}, data: [0, 0, 0]}

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.applyConfig({})
        ctrl.applyProps({fade: fn, note: fn, turn: fn})
    })

    it.each`
        index     | bindFns
        ${'Fade'} | ${['midimessage']}
        ${'Turn'} | ${['midimessage']}
        ${'Note'} | ${['midimessage']}
    `('engine: $index', ({index, bindFns}) => {
        const engine = new (SRC as any)[index + 'Engine'](ctrl, [], index.toLowerCase())
        // each(bindFns, (key: any) => engine[key](event))
        expect(engine).toBeTruthy()
    })
})
