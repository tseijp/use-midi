/** ref
 * https://github.com/pmndrs/react-spring/blob/master/packages/shared/src/helpers.ts
 */
import { Any } from '../rma'

type EachFun<Value=Any, Key=Any, This=Any> = (this: This, value: Value, key: Key) => void
type Eachable<Value=Any, Key=Any, This=Any> = {
    forEach(cb: EachFun<Value, Key, This>, ctx?: This): void
}

export const each = <Value, Key, This>(
    obj: Eachable<Value, Key, This>,
    fn: EachFun<Value, Key, This>
) => obj.forEach(fn)

export function eachProp<T extends object, This>(
    obj: T,
    fn: EachFun<T extends Any[]? T[number]: T[keyof T], string, This>,
    ctx?: This
) {
    // @ts-ignore
    for (const key in obj) fn.call(ctx, obj[key], key)
}

export function flush<T>(queue: Set<T>, iterator: EachFun<T>): void
export function flush<P, T>(queue: Map<P, T>, iterator: EachFun<[P, T]>): void
export function flush(queue: any, iterator: any) { // @TODO fix any
    if (queue.size) {
        const items = Array.from(queue)
        queue.clear()
        each(items, iterator)
    }
}

export function call<T>(fun: T | ((...args: unknown[]) => T), ...args: unknown[]): T {
    return is.fun(fun)? fun(...args): fun
}

export function chain(...fns: Function[]): Function {
    if (fns.length === 0) return () => {}
    if (fns.length === 1) return fns[0]
    let result: Any
    return (...args: Any[]) => {
        each(fns, fn => (result = fn(...args) || result))
        return result
    }
}

type IsType<U> = <T>(arg: T & any) => arg is Narrow<T, U>
type Narrow<T, U> = [T] extends [any] ? U : [T] extends [U] ? Extract<T, U> : U
type PlainObject<T = any> = Exclude<T & {[key: string]: any}, Function | readonly any[]>

export const is = (a: any, b?: any, ...other: any): boolean => {
    if (other.length > 0) return is(a, b) && is(b, ...other)
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a)) return a === b
    for (let i in a) if (!(i in b)) return false
    for (let i in b) if (a[i] !== b[i]) return false
    return true
}

is.arr = Array.isArray as IsType<readonly any[]>
is.fls = (a: unknown): a is false => is.und(a) || is.nul(a) || a === false || a === ''
is.nul = (a: unknown): a is null => a === null
is.und = (a: unknown): a is undefined => a === void 0
is.num = (a: unknown): a is number => typeof a === 'number'
is.str = (a: unknown): a is string => typeof a === 'string'
is.bol = (a: unknown): a is boolean => a === true || a === false
is.fun = ((a: unknown) => typeof a === 'function') as IsType<Function>,
is.obj = <T=any>(a: T&any): a is PlainObject<T> => !!a && a.constructor.name === 'Object'
