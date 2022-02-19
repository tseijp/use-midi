import { each, Controller } from 'use-midi/src'
import * as SRC from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const fns = {fade: fn, note: fn, turn: fn}
    const event = {target: {}, data: [0, 0, 0]}

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.apply(fns, {}, "fade", "note", "turn")
    })

    it.each`
        index     | bindFns
        ${'Fade'} | ${['midimessage']}
        ${'Turn'} | ${['midimessage']}
        ${'Note'} | ${['midimessage']}
    `('engine: $index', ({index, bindFns}) => {
      // @ts-ignore
        const engine = new SRC[index + 'Engine'](ctrl, [], index.toLowerCase())
        each(bindFns, (key: string) => engine[key](event))
        expect(engine).toBeTruthy()
    })
})
