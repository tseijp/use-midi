import { Rma, rma, MIDIAccess, MIDIConnectionEvent } from 'use-midi'


describe('rma', () => {
    let timeStamp = 0
    const midiAccess: Partial<MIDIAccess> = {onstatechange: () => {}};
    const nativeRma = jest.fn(() => new Promise(then => then(midiAccess)))

    beforeAll(() => {
        rma.now = jest.fn(() => timeStamp)
        rma.use(nativeRma)
    })

    // expect(rma.demanded).toBeFalsy()
    // expect(rma.supported).toBeFalsy()
    // expect(rma.allowed).toBeTruthy()

    it('function start rma', () => {
        const callback = jest.fn()
        rma(callback)
        expect(nativeRma.mock.calls.length).toBe(1)
        expect(rma.event).toBe(midiAccess)
        expect(rma.requested).toBeTruthy()
        // rma.cancel(callback)
    })

    it('function change rma', () => {
        const connection: Partial<MIDIConnectionEvent> = {}
        // midiAccess.onstatechange(connection)
    })
})
