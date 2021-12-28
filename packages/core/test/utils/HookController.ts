import { createElement as el } from 'react'
import { BaseController } from './BaseController'

export class HookController<Args extends any[] = any[]> extends BaseController<{args: Args}> {
    constructor () {
        super()
    }
}
