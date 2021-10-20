import * as SRC from 'use-midi/src'
import { rma, MIDIAccess } from 'use-midi/src'
import { renderHook } from '@testing-library/react-hooks'
import renderer from 'react-test-renderer'

describe('targets', () => {
    /**
     * setup mock
     */
    const fn = jest.fn()
    const fns = {onButton: fn, onSlider: fn, onKnob: fn, onNote: fn}
    const children = jest.fn(() => <></>)
    const target = undefined // TODO

    /**
     * setup rma
     */
    const midiAccess = {onstatechange: null} as unknown as MIDIAccess
    const nativeRma = () => new Promise(resolve => resolve(midiAccess))
    beforeAll(() => void rma.use(nativeRma))
    it.each`
        index     | target   | props | config
      ${'Button'} | ${void 0}| ${fn} | ${void 0}
      ${'Slider'} | ${void 0}| ${fn} | ${void 0}
      ${'Knob'}   | ${void 0}| ${fn} | ${{}}
      ${'Note'}   | ${void 0}| ${fn} | ${{}}
      ${'Midi'}   | ${void 0}| ${fns}| ${{}}
    `('class: $index', ({index, target, props, config}) => {
        const Class = (SRC as any)[index]
        const instance = new Class(target, props, config)
        expect(instance).toBeTruthy()
        expect(fn.mock.calls.length).toBe(0) // TODO
        instance.destroy()
    })

    it.each`
        index     | props
      ${'Button'} | ${{onButton: fn, target}}
      ${'Slider'} | ${{onSlider: fn, target}}
      ${'Knob'}   | ${{onKnob: fn, target}}
      ${'Note'}   | ${{onNote: fn, target}}
      ${'Midi'}   | ${{...fns}}
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
