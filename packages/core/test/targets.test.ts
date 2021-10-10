import { Button, Fader, Note } from 'use-midi/src'
import { useButton, useFader, useNote } from 'use-midi/src'
import { UseButton, UseFader, UseNote } from 'use-midi/src'

describe('vannilla', () => {
    const entries = Object.entries({ Button, Fader, Note })
    it.each(entries)('vanilla: %s', (key, props) => {
        expect(key).toBeTruthy()
        expect(props).toBeTruthy()
    })
})

describe('hooks', () => {
    const entries = Object.entries({useButton, useFader, useNote})
    it.each(entries)('hook: %s', (key, props) => {
        expect(key).toBeTruthy()
        expect(props).toBeTruthy()
    })
})

describe('components', () => {
    const entries = Object.entries({UseButton, UseFader, UseNote})
    it.each(entries)('component: %s', (key, props) => {
        expect(key).toBeTruthy()
        expect(props).toBeTruthy()
    })
})
