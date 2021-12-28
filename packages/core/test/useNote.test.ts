import React, { createElement as el } from 'react'
import { EventController, HookController } from './utils'
import { useNote } from 'use-midi/src'

describe('useNote', () => {
    let bind: any, state: any
    type Args = Parameters<typeof useNote>
    const hook = new HookController<Args>()
    const event = new EventController<any>()
    afterEach(hook.clean)
    afterEach(event.clean)

    it('basic', () => {
        hook.init(({ args }) => (bind = useNote(...args!))? null: null)
        hook.set({ args : [($: any) => (state = $)]})
        expect(state.value).toBe(0)

        event.init(props => el('div', props))
        event.set(bind())
        expect(state.value).toBe(0)

        event.click()
        expect(state.value).toBe(1)
    })
})
