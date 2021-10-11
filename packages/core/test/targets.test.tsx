import { createElement as el } from 'react'
import { Button, Fader, Note, Midi, Props } from 'use-midi/src'
import { useButton, useFader, useNote, useMidi } from 'use-midi/src'
import { UseButton, UseFader, UseNote, UseMidi } from 'use-midi/src'
import { renderHook, act } from '@testing-library/react-hooks'
import renderer from 'react-test-renderer'

describe('vannilla', () => {
    const fn = jest.fn()
    const entries = Object.entries({ Button, Fader, Note })
    const target = {} as EventTarget
    it.each(entries)('vanilla: %s', (key, Class) => {
        const instance = new Class(target, fn)
        expect(key).toBeTruthy()
        expect(instance).toBeTruthy()
        instance.destroy()
    })
})

describe('react', () => {
    const hooks = Object.entries({useButton, useFader, useNote, useMidi})
    const components = Object.entries({UseButton, UseFader, UseNote, UseMidi})
    const children = jest.fn(() => <></>)
    const target = {}
    const fn = jest.fn()
    const propsMap = new Map<string, any>([
        ['Button', {onButton: fn, target}],
        ['Fader', {onFader: fn, target}],
        ['Note', {onNote: fn, target}],
        ['Midi', {onButton: fn, onFader: fn, onNote: fn}]
    ])

    it.each(hooks)('hook: %s', (key='', use: any) => {
        const props = propsMap.get(key.replace('use', ''))
        const { current } = renderHook(() => use(props)).result
        expect(key).toBeTruthy()
        expect(use).toBeTruthy()
        expect(current).toBeTruthy()
        act(() => {
            // current.bind()
        })
    })

    it.each(components)('component: %s', (key='', Use: any) => {
        const props = propsMap.get(key.replace('Use', ''))
        const element = renderer.create(el(Use, props, children))
        expect(key).toBeTruthy()
        expect(element).toBeTruthy()
        // expect(fn.mock.calls.length).toBe(1)
    })
})
