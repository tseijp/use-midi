import { each, Controller, ButtonEngine, FaderEngine, NoteEngine } from 'use-midi/src'

describe('Base Engine', () => {
    let ctrl: Controller
    const fn = jest.fn()
    const event = {target: {}, data: [0, 0, 0]}
    const engines = Object.entries({ButtonEngine, FaderEngine, NoteEngine})
    const bindFns = {
        button: ['button', 'buttonEnd'],
        fader: ['fader', 'faderEnd'],
        note: ['note', 'noteEnd']
    }

    beforeEach(() => {
        ctrl = new Controller()
        ctrl.applyConfig({})
        ctrl.applyProps({onButton: fn, onFader: fn, onNote: fn})
    })

    it.each(engines)('engine: %s', (key, Engine) => {
        const name = key.replace('Engine', '').toLowerCase() as never
        const engine = new Engine(ctrl, [], name)
        each(bindFns[name], (key: any) => (engine as any)[key](event))
        expect(engine).toBeTruthy()
    })
})
