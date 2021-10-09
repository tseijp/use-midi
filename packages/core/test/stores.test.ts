import { EventStore, AccessStore, TimeoutStore } from 'use-midi/src'

describe('EventStore', () => {
    let store: any;
    beforeEach(() => {
        store = new EventStore()
    })
    it('add', () => {
        expect(void 0).toBeFalsy()
    })
})

describe('AccessStore', () => {
    let store: any;
    beforeEach(() => {
        store = new AccessStore()
    })
    it('add', () => {
        expect(void 0).toBeFalsy()
    })
})

describe('TimeoutStore', () => {
    let store: any;
    beforeEach(() => {
        store = new TimeoutStore()
    })
    it('add', () => {
        expect(void 0).toBeFalsy()
    })
})
