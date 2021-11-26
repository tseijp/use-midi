import { rma, Controller } from 'use-midi/src'

describe('controller', () => {
    const fn = jest.fn()
    const fns = {fade: fn, note: fn, turn: fn}
    const nativeRma = () => new Promise(_ => _({onstatechange: null}))
    beforeAll(() => void rma.use(nativeRma))

    it.each`
    key       | props | config
    ${'fade'} | ${{fade: fn}} | ${{}}
    `('check bind for $key', ({props}) => {
        const ctrl = new Controller(props)
        const bind = ctrl.bind.bind(ctrl)
    })
})
