import { each, eachProp, chain, flush, is } from 'use-midi/src';

describe('each', () => {
    it('eachable array', () => {
        const callback = jest.fn(x => 42 + x)
        each([0, 1], callback)
        expect(callback.mock.calls.length).toBe(2)     // The mock function is called twice
        expect(callback.mock.calls[0][0]).toBe(0)      // The first argument of the first call to the function was 0
        expect(callback.mock.calls[1][0]).toBe(1)      // The first argument of the second call to the function was 1
        expect(callback.mock.results[0].value).toBe(42)// The return value of the first call to the function was 42
    })
})

describe('eachProp', () => {
    it('eachable object', () => {
        const callback = jest.fn((value, key) => value + key)
        eachProp({foo: 0, bar: 1}, callback)
        expect(callback.mock.calls.length).toBe(2)         // The mock function is called twice
        expect(callback.mock.calls[0][0]).toBe(0)          // The first argument of the first call to the function was 0
        expect(callback.mock.calls[1][1]).toBe('bar')      // The first argument of the second call to the function was 1
        expect(callback.mock.results[0].value).toBe('0foo')// The return value of the first call to the function was 42
    })
})

describe('chain', () => {
    it('0 length', () => {
        const result = chain()
        expect(result()).toBeFalsy()
    })
    it('1 length', () => {
        const callback = jest.fn(x => 42 + x)
        const result = chain(callback)(0)
        expect(result).toEqual(42)
        expect(callback.mock.calls.length).toBe(1)
        expect(callback.mock.calls[0][0]).toBe(0)
        expect(callback.mock.results[0].value).toBe(42)
    })
    it('some length', () => {
        const callback = jest.fn(x => 42 + x)
        const result = chain(...Array(10).fill(callback))(0)
        expect(result).toEqual(42)
        expect(callback.mock.calls.length).toBe(10)
        expect(callback.mock.calls[0][0]).toBe(0)
        expect(callback.mock.results[0].value).toBe(42)
    })
})

describe('flush', () => {
    it('Set target', () => {
        const callback = jest.fn(x => 42 + x)
        const target = new Set([0, 1])
        flush<number>(target, callback)
        expect(target).toEqual(new Set())
        expect(callback.mock.calls.length).toBe(2)     // The mock function is called twice
        expect(callback.mock.calls[0][0]).toBe(0)      // The first argument of the first call to the function was 0
        expect(callback.mock.calls[1][0]).toBe(1)      // The first argument of the second call to the function was 1
        expect(callback.mock.results[0].value).toBe(42)// The return value of the first call to the function was 42
    })

    it ('Map target', () => {
        const callback = jest.fn(([prop, key]) => prop + key)
        const target = new Map([['foo', 0], ['bar', 1]])
        flush<string, number>(target, callback)
        expect(target).toEqual(new Map())
        expect(callback.mock.calls.length).toBe(2)           // The mock function is called twice
        expect(callback.mock.calls[0][0]).toEqual(['foo', 0])// The first argument of the first call to the function was 0
        expect(callback.mock.calls[1][0]).toEqual(['bar', 1])// The first argument of the second call to the function was 1
        expect(callback.mock.results[0].value).toBe('foo0')  // The return value of the first call to the function was 42
    })
})

describe('is', () => {
    it('is to be truthy', () => {
        const foo = 'foo'
        expect(is(0, 0, 0)).toBeTruthy()
        expect(is('0', '0', '0')).toBeTruthy()
        expect(is({foo}, {foo})).toBeTruthy()
        expect(is([foo], [foo])).toBeTruthy()
        expect(is({}, {}, {})).toBeTruthy()
    })
    it('is to be falsy', () => {
        const foo = 'foo',
              bar = 'bar'
        expect(is(0, 0, 1)).toBeFalsy()
        expect(is('0', '0', 0)).toBeFalsy()
        expect(is('0', '0', '1')).toBeFalsy()
        expect(is({foo}, {bar})).toBeFalsy()
        expect(is([foo], [bar])).toBeFalsy()
        expect(is({}, {}, {bar})).toBeFalsy()
    })
    it('is.xxx', () => {
        expect(is.arr([])).toBeTruthy()
        expect(is.fls('')).toBeTruthy()
        expect(is.nul(null)).toBeTruthy()
        expect(is.und(undefined)).toBeTruthy()
        expect(is.num(0)).toBeTruthy()
        expect(is.str("")).toBeTruthy()
        expect(is.fun(() => {})).toBeTruthy()
        expect(is.obj({})).toBeTruthy()
    })
})
