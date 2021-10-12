import renderer from 'react-test-renderer'
import { renderHook, act } from '@testing-library/react-hooks'
import {
    Button, Fader, Note, Midi,
    useButton, useFader, useNote, useMidi,
    UseButton, UseFader, UseNote, UseMidi,
    // MIDIAccess, MIDIConnectionEvent, rma,
} from 'use-midi/src'

const hooks = {useButton, useFader, useNote, useMidi} as any
const components = {UseButton, UseFader, UseNote, UseMidi} as any

describe('targets', () => {
    /**
     * setup mock
     */
    const fn = jest.fn()
    const fns = {onButton: fn, onFader: fn, onNote: fn}
    const children = jest.fn(() => <></>)
    const target = {}

    /**
     * setup rma
     */
    // const midiAccess = {onstatechange: null} as unknown as MIDIAccess
    // const connection = {target: midiAccess} as unknown as MIDIConnectionEvent
    // const nativeRma = () => new Promise(resolve => resolve(midiAccess))
    // beforeAll(() => void rma.use(nativeRma))

    it.each`
        index     | Class     | target   | props | config
      ${'Button'} | ${Button} | ${{}}    | ${fn} | ${void 0}
      ${'Fader'}  | ${Fader}  | ${'div'} | ${fn} | ${void 0}
      ${'Note'}   | ${Note}   | ${void 0}| ${fn} | ${{}}
      ${'Midi'}   | ${Midi}   | ${void 0}| ${fns}| ${{}}
    `('class: $index', ({Class, target, props, config}) => {
        const instance = new Class(target, props, config)
        expect(instance).toBeTruthy()
        expect(fn.mock.calls.length).toBe(0)
        instance.destroy()
    })

    it.each`
        index     | props
      ${'Button'} | ${{onButton: fn, target}}
      ${'Fader'}  | ${{onFader: fn, target}}
      ${'Note'}   | ${{onNote: fn, target}}
      ${'Midi'}   | ${{onButton: fn, onFader: fn, onNote: fn}}
    `('react: $index', ({index, props}) => {
        const use = hooks['use' + index]
        const Use = components['Use' + index]
        const { current } = renderHook(() => use(props)).result
        const element = renderer.create(<Use {...{...props, children}}/>)
        expect(current && element).toBeTruthy()
        expect(children.mock.calls.length).toBe(1)
        // act(() => {
        //     midiAccess.onstatechange(connection)
        // })
    })
})
