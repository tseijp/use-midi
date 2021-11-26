import * as SRC from 'use-midi/src'
import { rma, MIDIAccess } from 'use-midi/src'
import { renderHook } from '@testing-library/react-hooks'
import renderer from 'react-test-renderer'

describe('targets', () => {
    /**
     * setup mock
     */
    const fn = jest.fn()
    const fns = {fade: fn, note: fn, turn: fn}
    const children = jest.fn(() => <></>)
    const target = document.createElement('div')

    /**
     * setup rma
     */
    const midiAccess = {onstatechange: null} as unknown as MIDIAccess
    const nativeRma = () => new Promise(resolve => resolve(midiAccess))
    beforeAll(() => void rma.use(nativeRma))

    it.each`
        index     | target     | props | config
        ${'Fade'} | ${target}  | ${fn} | ${void 0}
        ${'Note'} | ${'mouse'} | ${fn} | ${{}}
        ${'Turn'} | ${'touch'} | ${fn} | ${{}}
        ${'Midi'} | ${window}  | ${fns}| ${{}}
    `('class: $index', ({index, target, props, config}) => {
        const Class = (SRC as any)[index]
        const instance = new Class(target, props, config)
        expect(instance).toBeTruthy()
        expect(fn.mock.calls.length).toBe(0) // TODO
        instance.destroy()
    })

    it.each`
        index     | props
        ${'Fade'} | ${{fade: fn}}
        ${'Note'} | ${{note: fn, target}}
        ${'Turn'} | ${{turn: fn, target}}
        ${'Midi'} | ${{...fns, target: window}}
    `('react: $index', ({index, props}) => {
        const use = (SRC as any)['use' + index]
        const Use = (SRC as any)['Use' + index]
        const { current } = renderHook(() => use(props)).result
        const element = renderer.create(<Use {...{...props, children}}/>)
        expect(current && element).toBeTruthy()
        expect(children.mock.calls.length).toBe(1)
        // act(() => midiAccess.onstatechange(connection)) // TODO
    })
})
