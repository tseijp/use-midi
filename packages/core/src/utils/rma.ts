/*
MIT License

Copyright (c) 2018-present Paul Henschel, react-spring, all contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

type Fun = () => boolean | void

type AnyFun = (...args: any) => any

type VoidFn = (...args: any[]) => undefined | void

type UpdateFun = (ts?: number) => boolean | void

export interface Rmaz {
    (update: UpdateFun): void
    write: (fun: Fun) => void
    onStart: (fun: Fun) => void
    onAccess: (fun: Fun) => void
    onFinish: (fun: Fun) => void

    cancel: (fun: AnyFun) => void
    sync: (fun: VoidFn) => void
    throttle: (fun: VoidFn) => void

    use: (fun: Fun) => void
    now: () => number
    fun: (fun: Fun) => void
    catch: (error: Error) => void
    advance: () => void
    status: 'always' | 'demand'

    event?: any
    inputs?: any
    outputs?: any
}

export interface Queue<T extends Function = any> {
    add: (fun: T) => void
    delete: (fun: T) => boolean
    flush: (arg?: any) => void
}

let ts = -1


let sync = false

let sysex = true

let software = true

let event: any

let updateQueue = makeQueue<UpdateFun>(),
     writeQueue = makeQueue<Fun>(),
    onStartQueue = makeQueue<Fun>(),
   onAccessQueue = makeQueue<Fun>(),
   onFinishQueue = makeQueue<Fun>()

let nativeRma =
    typeof navigator !== 'undefined' &&
    typeof (navigator as any).requestMIDIAccess === 'function'
        ? () => (navigator as any).requestMIDIAccess({sysex, software})
        : () => {}

export const rma: Rmaz = fun => schedule(fun, updateQueue)

rma.write = fun => schedule(fun, writeQueue)
rma.onStart = fun => schedule(fun, onStartQueue)
rma.onAccess = fun => schedule(fun, onAccessQueue)
rma.onFinish = fun => schedule(fun, onFinishQueue)

rma.cancel = fun => {
    updateQueue.delete(fun)
    writeQueue.delete(fun)
}

rma.sync = fun => {
    sync = true
    rma.fun(fun)
    sync = false
}

rma.throttle = fun => {
    fun() // TODO
}

rma.use = fun => (nativeRma = fun)
rma.now = typeof performance != 'undefined' ? () => performance.now() : Date.now
rma.fun = fun => fun()
rma.catch = console.error
rma.status = 'always'

setHidden('event', () => event)
setHidden('inputs', () => event?.target.inputs)
setHidden('outputs', () => event?.target.outputs)

rma.advance = () => {
    if (rma.status !== 'demand')
        console.warn('Cannot call the manual advancement of rmaz')
    else update()
}

function start () {
    if (ts < 0) {
        ts = 0
        if (rma.status !== 'demand')
            nativeRma().then(change, rma.catch)
    }
}

function change (e?: any) {
    if (~ts) {
        e.onstatechange = change
        event = e.target? e: {target: e}
        rma.fun(update)
    }
}

function update () {
    let prevTs = ts
    ts = rma.now()

    onStartQueue.flush()
    updateQueue.flush(prevTs)
    onAccessQueue.flush()
    writeQueue.flush()
    onFinishQueue.flush()
}

function schedule<T extends Function>(fun: T, queue: Queue<T>) {
    if (sync) {
        queue.delete(fun)
        fun(0)
    }
    else {
        queue.add(fun)
        start()
    }
}

function makeQueue<T extends Function>(): Queue<T> {
    let next = new Set<T>()
    let current = next
    return {
        add: fun =>  next.add(fun),
        delete: fun => next.delete(fun),
        flush: arg => {
            if (current.size) {
                next = new Set()
                current.forEach(fun => fun(arg) && next.add(fun))
                current = next
            }
        }
    }
}

function setHidden (key: any, fun: AnyFun) {
    Object.defineProperty(rma, key, {get () {return fun()}})
}
