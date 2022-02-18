/* MIT License */
// @ts-ignore
export class Any { private unused: never }

export type Fun<I extends ReadonlyArray<unknown>=any[], O=any> = (...args: I) => O

type nativeRma = () => undefined | Promise<unknown>

export interface Queue<T extends Fun = Fun> {
    add: (fun: T) => void
    delete: (fun: T) => boolean
    flush: (arg?: unknown) => void
}

export interface Rma {
    (update: Fun<number[]>): void
    write: (fun: Fun) => void
    onStart: (fun: Fun) => void
    onAccess: (fun: Fun) => void
    onFinish: (fun: Fun) => void

    sync: (fun: Fun) => void
    cancel: (fun: Fun) => void
    throttle: (fun: Fun) => void

    use: <T extends nativeRma>(impl: T) => T
    now: () => number
    fun: (fun: Fun) => void
    warn: (error: string) => void
    error: (error: Error) => void
    advance: () => void

    event?: Any
    inputs?: Any
    outputs?: Any

    allowed: boolean
    demanded: boolean
    supported: boolean
    options: {
        sysex: boolean,
        software: boolean
    }
}

const writeQueue = makeQueue<Fun>()
const onStartQueue = makeQueue<Fun>()
const onAccessQueue = makeQueue<Fun>()
const onFinishQueue = makeQueue<Fun>()
const updateQueue = makeQueue<Fun<number[]>>()

export const rma: Rma = (fun) => schedule(fun, updateQueue)
rma.write = fun => schedule(fun, writeQueue)
rma.onStart = fun => schedule(fun, onStartQueue)
rma.onAccess = fun => schedule(fun, onAccessQueue)
rma.onFinish = fun => schedule(fun, onFinishQueue)

let ts = -1, sync = false, event: Event, nativeRma = () => {
    if (!rma.supported) rma.warn('Cannot supported Web MIDI API for rmaz')
    // @ts-ignore
    else return navigator.requestMIDIAccess(rma.options)
}

rma.sync = fun => void ( sync = true, rma.fun(fun), sync = false )
rma.cancel = fun => void ( updateQueue.delete(fun), writeQueue.delete(fun) )
rma.throttle = fun => rma.fun(fun) // @TODO
rma.use = fun => (nativeRma = fun)
rma.now = typeof performance != 'undefined' ? () => performance.now() : Date.now
rma.fun = fun => fun()
rma.warn = console.warn
rma.error = console.error
rma.options = { sysex: true, software: true }
rma.allowed = rma.demanded = false
rma.supported =
    typeof navigator !== 'undefined' &&
    // @ts-ignore
    typeof navigator.requestMIDIAccess === 'function'

setHidden('event', () => event) // @ts-ignore
setHidden('inputs', () => event?.target?.inputs) // @ts-ignore
setHidden('outputs', () => event?.target?.outputs)

rma.advance = () => {
    if (!rma.demanded)
        rma.warn("Error: Can't call the manual advancement of rmaz")
    else update()
}

function start () {
    if (ts < 0) {
        ts = 0
        if (!rma.demanded) {
            rma.demanded = true
            nativeRma()?.then(change, rma.error)
        }
    }
}

function change (e: Event & {onstatechange: typeof change}) {
    if (~ts) {
        e.onstatechange = change
        event = (e.target? e: {target: e}) as Event
        rma.allowed = true
        rma.fun(update)
    }
}

function update () {
    let prevTs = ts
    ts = rma.now()
    onStartQueue.flush()
    updateQueue.flush(ts - prevTs)
    onAccessQueue.flush()
    writeQueue.flush()
    onFinishQueue.flush()
}

function schedule<T extends Fun=Fun>(fun: T, queue: Queue<T>) {
    if (sync) {
        queue.delete(fun)
        fun(0)
    }
    else {
        queue.add(fun)
        start()
    }
}

function makeQueue<T extends Fun=Fun>(): Queue<T> {
    let next = new Set<T>()
    let current = next
    return {
        delete: fun => next.delete(fun),
        add: fun =>  next.add(fun),
        flush: arg => {
            if (current.size) {
                next = new Set()
                current.forEach(fun => fun(arg) && next.add(fun))
                current = next
            }
        }
    }
}

function setHidden (key: string, fun: Fun) {
    Object.defineProperty(rma, key, {
        get () { if (rma.allowed) return fun() }
    })
}
