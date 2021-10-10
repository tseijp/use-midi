import { rma, EventStore, AccessStore, TimeoutStore } from 'use-midi/src'

describe('stores', () => {
    // mock
    const removeEventListener = () => {}
    const addEventListener = (_='', fn: Function) => fn()
    const _setTimeout = window.setTimeout
    const setTimeout = (fn: Function) => fn()
    const nativeRma = () => new Promise(_ => _({onstatechange: null}))
    const callback = jest.fn(() => true)

    beforeAll(() => void rma.use(nativeRma))
    beforeAll(() => void (window.setTimeout = setTimeout as any))
    afterAll(() => void (window.setTimeout = _setTimeout))

    const entries = Object.entries({EventStore, AccessStore, TimeoutStore})
    const props = {
        EventStore: [{addEventListener, removeEventListener}, 'midimessage', callback],
        AccessStore: [callback],
        TimeoutStore: ['key', callback]
    } as object as {[key: string]: [any, any, any]}

    it.each(entries)('store: %s', (key, Store) => {
        const store = new Store(), length = 3
        for (let i=0; i < length; i++)
            store.add(...props[key])
        rma.demanded = true
        rma.advance()
        expect(callback.mock.calls.length).toBe(length)
        store.clean()
    })
})
