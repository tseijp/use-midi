import { call, chain, is } from 'use-midi/src';
import * as SRC from 'use-midi/src'
describe('each, eachProp', () => {
    const numFun = jest.fn(x => 42 + x)
    const strFun = jest.fn((value, key) => value + key)
    const arr = [0, 1], obj = {foo: 0, bar: 1}
    const set = new Set([0, 1]), map = new Map([['foo', 0], ['bar', 1]])
    it.each`
        index        | target | callback  | value       | len  | c00  | c11
        ${'each'}    | ${arr} | ${numFun} | ${42}       | ${2} | ${0} | ${1}
        ${'each'}    | ${set} | ${numFun} | ${42}       | ${2} | ${0} | ${1}
        ${'each'}    | ${map} | ${strFun} | ${'0foo'}   | ${2} | ${0} | ${'bar'}
        ${'eachProp'}| ${obj} | ${strFun} | ${'0foo'}   | ${2} | ${0} | ${'bar'}
        ${'flush'}   | ${set} | ${numFun} | ${42}       | ${2} | ${0} | ${1}
        ${'flush'}   | ${map} | ${strFun} | ${'foo,00'} | ${2} | ${['foo', 0]} | ${1}
    `('eachable function: $index', ({index, target, callback, len, c00, c11, value}) => {
        (SRC as any)[index](target, callback)
        expect(callback.mock.calls.length).toEqual(len)       // The mock function is called twice
        expect(callback.mock.calls[0][0]).toEqual(c00)        // The first argument of the first call to the function was 0
        expect(callback.mock.calls[1][1]).toEqual(c11)        // The first argument of the second call to the function was 1
        expect(callback.mock.results[0].value).toEqual(value) // The return value of the first call to the function was 42
    })
})

describe('fns', () => {
    const callback = jest.fn(x => 42 + x)
    it.each`
        length | calls00   | value     | fun
        ${0}   | ${void 0} | ${void 0} | ${() => chain()(0)}
        ${1}   | ${0}      | ${42}     | ${() => chain(callback)(0)}
        ${10}  | ${0}      | ${42}     | ${() => chain(...Array(10).fill(callback))(0)}
        ${0}   | ${void 0} | ${void 0} | ${() => call(void 0)}
        ${1}   | ${void 0} | ${NaN}    | ${() => call(callback)}
        ${1}   | ${1}      | ${43}     | ${() => call(callback, 1)}
    `('index of $#', ({length, calls00, value, fun}) => {
        expect(fun()).toEqual(value)
        expect(callback.mock.calls.length).toBe(length)
        expect(callback.mock.calls[0]?.[0]).toBe(calls00)
        expect(callback.mock.results[0]?.value).toBe(value)
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
        expect(is.bol(false)).toBeTruthy()
        expect(is.fun(() => {})).toBeTruthy()
        expect(is.obj({})).toBeTruthy()
    })
})
