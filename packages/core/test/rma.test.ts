import { rma, MIDIAccess, MIDIConnectionEvent } from 'use-midi/src'

describe('rma', () => {
    let currentTime = 0
    const midiAccess = {onstatechange: null} as unknown as MIDIAccess
    const connection = {target: midiAccess} as unknown as MIDIConnectionEvent
    const nativeRma = () => new Promise(resolve => resolve(midiAccess))
    const callback = jest.fn(() => true)
    const now = () => currentTime++

    beforeAll(() => {
        expect(rma.allowed).toBeFalsy()
        expect(rma.demanded).toBeFalsy()
        expect(rma.supported).toBeFalsy()
        expect(rma.demanded).toBeFalsy()
        rma.now = now
        rma.warn = () => {}
        rma.use(nativeRma); rma(callback)
        rma.write(callback); rma.onStart(callback)
        rma.onAccess(callback); rma.onFinish(callback)
    })

    it('function start', () => {
        expect(rma.event).toBeTruthy()
        expect(rma.allowed).toBeTruthy()
        expect(rma.demanded).toBeTruthy()
        expect(midiAccess.onstatechange).toBeTruthy()
    })

    it.each`
        len | call 0      | call 1      | fun name     | fun
       ${5} | ${[void 0]} | ${[0]}      | ${'state'}   | ${() => {midiAccess.onstatechange(connection)}}
       ${5} | ${[void 0]} | ${[1]}      | ${'advance'} | ${() => {rma.advance()}}
       ${3} | ${[void 0]} | ${[void 0]} | ${'cancel'}  | ${() => {rma.cancel(callback), rma.advance()}}
       ${0} | ${ void 0 } | ${ void 0 } | ${'warn'}    | ${() => {rma.demanded = false; rma.advance()}}
    `('function: $funname', ({len, call0, call1, fun}) => {
        rma.fun(fun)
        expect(callback.mock.calls.length).toBe(len)
        expect(callback.mock.calls[0]).toEqual(call0)
        expect(callback.mock.calls[1]).toEqual(call1)
    })

    it('function schedule at syncing', () => {
        const syncFun = jest.fn()
        rma.sync(() => {
            rma(syncFun)
            expect(syncFun.mock.calls).toEqual([[0]])
        })
    })
})
