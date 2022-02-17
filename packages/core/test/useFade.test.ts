import React, { createElement as el } from 'react'
import { EventController, HookController } from './utils'
import { useFade } from 'use-midi/src'

describe('useFade', () => {
    let bind: any, state: any
    type Args = Parameters<typeof useFade>
    const hook = new HookController<Args>()
    const event = new EventController<any>()
    afterEach(hook.clean)
    afterEach(event.clean)

    it('basic', () => {
        expect(1).toBe(1)
        hook.init(({ args }) => (bind = useFade(...args!))? null: null)
        hook.set({ args : [($: any) => (state = $)]})
        expect(state.value).toBe(0)

        event.init(props => el('div', props))
        event.set(bind())
        expect(state.value).toBe(0)

        event.click()
        expect(state.value).toBe(1)
    })
})
