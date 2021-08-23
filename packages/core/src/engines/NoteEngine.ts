import { BaseEngine } from './BaseEngine'

export class NoteEngine extends BaseEngine<'note'> {
    _key = 'note' as const

    bind (fn: any) {
        fn('note', '', this.note.bind(this))
    }

    note (event: any) {
        const {state} = this
        if (state.active) this.noteStart(event)
        else this.noteChange(event)
        this.accessStore.add('noteEnd', this.noteEnd.bind(this))
    }

    noteStart (event: any) {
        this.start(event)
        this.compute(event)
    }

    noteChange (event: any) {
        this.compute(event)
    }

    noteEnd (event?: any) {
        if (!this.state.active) return
        this.state.active = false
        this.compute(event)
    }
}
