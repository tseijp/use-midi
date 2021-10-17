/* MIT License */
type Fun = () => boolean | void

type AnyFun = (...args: any) => any

type VoidFn = (...args: any[]) => undefined | void

type UpdateFun = (ts?: number) => boolean | void

type nativeRma = () => undefined | Promise<any>

export interface Rma {
    (update: UpdateFun): void
    write: (fun: Fun) => void
    onStart: (fun: Fun) => void
    onAccess: (fun: Fun) => void
    onFinish: (fun: Fun) => void

    cancel: (fun: AnyFun) => void
    sync: (fun: VoidFn) => void
    throttle: (fun: VoidFn) => void

    use: <T extends nativeRma>(impl: T) => T
    now: () => number
    fun: (fun: Fun) => void
    warn: (error: string) => void
    error: (error: Error) => void
    advance: () => void

    event?: any
    inputs?: any
    outputs?: any

    allowed: boolean
    demanded: boolean
    supported: boolean
    options: {
        sysex: boolean,
        software: boolean
    }
}

export interface Queue<T extends Function = any> {
    add: (fun: T) => void
    delete: (fun: T) => boolean
    flush: (arg?: any) => void
}

export const rma: Rma = fun => schedule(fun, updateQueue)

let ts = -1,
    sync = false,
    event: any,
    writeQueue = makeQueue<Fun>(),
    onStartQueue = makeQueue<Fun>(),
    onAccessQueue = makeQueue<Fun>(),
    onFinishQueue = makeQueue<Fun>(),
    updateQueue = makeQueue<UpdateFun>(),
    nativeRma = rma.supported
        ? () => (navigator as any).requestMIDIAccess(rma.options)
        : () => {}

rma.write = fun => schedule(fun, writeQueue)
rma.onStart = fun => schedule(fun, onStartQueue)
rma.onAccess = fun => schedule(fun, onAccessQueue)
rma.onFinish = fun => schedule(fun, onFinishQueue)

rma.sync = fun => void ( sync = true, rma.fun(fun), sync = false )
rma.cancel = fun => void ( updateQueue.delete(fun), writeQueue.delete(fun) )
rma.throttle = fun => rma.fun(fun) // TODO

rma.use = fun => (nativeRma = fun)
rma.now = typeof performance != 'undefined' ? () => performance.now() : Date.now
rma.fun = fun => fun()
rma.warn = console.warn
rma.error = console.error
rma.allowed = false
rma.demanded = false
rma.supported =
    typeof navigator !== 'undefined' &&
    typeof (navigator as any).requestMIDIAccess === 'function'

rma.options = {
    sysex: true,
    software: true
}

setHidden('event', () => event)
setHidden('inputs', () => event?.target.inputs)
setHidden('outputs', () => event?.target.outputs)

rma.advance = () => {
    if (!rma.demanded)
        rma.warn('Cannot call the manual advancement of rmaz')
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

function change (e: any) {
    if (~ts) {
        rma.allowed = true
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
    Object.defineProperty(rma, key, {
        get () {
            if (!rma.demanded)
                start()
            if (rma.allowed)
                return fun()
        }
    })
}
