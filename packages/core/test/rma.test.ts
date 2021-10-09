import { rma, MIDIAccess, MIDIConnectionEvent } from 'use-midi/src'


describe('rma', () => {
    let timeStamp = 0
    const midiAccess = {onstatechange: null} as unknown as MIDIAccess
    const connection = {target: midiAccess} as unknown as MIDIConnectionEvent
    const nativeRma = jest.fn(() => new Promise(resolve => resolve(midiAccess)))
    const callback = jest.fn(() => true)

    beforeAll(() => {
        expect(rma.allowed).toBeFalsy()
        expect(rma.demanded).toBeFalsy()
        expect(rma.supported).toBeFalsy()
        expect(rma.demanded).toBeFalsy()
        rma.now = jest.fn(() => timeStamp)
        rma.use(nativeRma)
        rma(callback)
    })

    it('function start and connect', () => {
        expect(rma.allowed).toBeTruthy()
        expect(rma.demanded).toBeTruthy()
        expect(midiAccess.onstatechange).toBeTruthy()
        timeStamp += 1
        rma.advance()
        rma.sync(() => {})
        timeStamp += 1
        midiAccess.onstatechange(connection)
    })
})
