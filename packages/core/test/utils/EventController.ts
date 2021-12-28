import { BaseController } from './BaseController'
// import { render, RenderResult } from '@testing-library/react'
import fireEvent from '@testing-library/user-event'

export class EventController<Props> extends BaseController<Props> {
    constructor() {
        super()
    }

    click () {
    }
}
