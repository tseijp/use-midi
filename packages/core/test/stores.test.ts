import { rma } from 'use-midi/src'
import * as SRC from 'use-midi/src'

describe('stores', () => {
    // mock
    const removeEventListener = () => {}
    const addEventListener = (_='', fn: Function) => fn()
    const _setTimeout = window.setTimeout
    const setTimeout = (fn: Function) => fn()
    const nativeRma = () => new Promise(_ => _({onstatechange: null}))
    const callback = jest.fn(() => true)

    beforeAll(() => void rma.use(nativeRma))
    // @ts-ignore
    beforeAll(() => void (window.setTimeout = setTimeout))
    afterAll(() => void (window.setTimeout = _setTimeout))

    it.each`
        index            | args
        ${'EventStore'}  | ${[{addEventListener, removeEventListener}, 'midimessage', callback]}
        ${'AccessStore'} | ${[callback]}
    `('store: $index', ({index, args}) => {
        // @ts-ignore
        const store = new SRC[index](), length = 3
        for (let i=0; i < length; i++)
            store.add(...args)
        rma.demanded = true
        rma.advance()
        expect(callback.mock.calls.length).toBe(length)
        store.clean()
    })
})
