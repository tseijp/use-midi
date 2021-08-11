export type Fun = () => boolean | void

export type updateFun = (access?: any) => boolean | void

export interface Rmaz {
    (update: updateFun): void
    write: (fun: Fun) => void
    onStart: (fun: Fun) => void
    onAccess: (fun: Fun) => void
    onFinish: (fun: Fun) => void

    cancel: (fun: Fun) => void
    sync: (fun: Fun) => void
    throttle: (fun: Fun) => void

    use: (fun: Fun) => void
    now: () => number
    fun: (fun: Fun) => void
    catch: (error: Error) => void
    advance: () => void
    status: 'always' | 'demand'
}

export interface Queue<T extends Function = any> {
    add: (fun: T) => void
    delete: (fun: T) => boolean
    flush: (arg?: any) => void
}

let ts = -1

let sync = false

let updateQueue = makeQueue<updateFun>(),
     writeQueue = makeQueue<Fun>(),
    onStartQueue = makeQueue<Fun>(),
   onAccessQueue = makeQueue<Fun>(),
   onFinishQueue = makeQueue<Fun>()

let nativeRma =
    typeof navigator !== 'undefined' &&
    typeof (navigator as any).requestMidiAccess === 'function'
        ? () => (navigator as any).requestMidiAccess({sysex: 0xF0})
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

rma.throttle = fun => fun() // TODO
rma.use = fun => (nativeRma = fun)
rma.now = typeof performance != 'undefined' ? () => performance.now() : Date.now
rma.fun = fun => fun()
rma.catch = console.error
rma.status = 'always'

rma.advance = () => {
    if (rma.status !== 'demand')
        console.warn('Cannot call the manual advancement of rmaz')
    else update()
}

function start () {
    if (ts < 0 && rma.status !== 'demand')
        ts = 0
        nativeRma().then(change).catch(rma.catch)
}

function change (event?: any) {
    if (~ts) {
        event.onstatechange = (e: any) => change(e)
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
        },
    }
}
