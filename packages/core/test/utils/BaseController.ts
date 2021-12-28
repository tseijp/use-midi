import React, { FC, ComponentClass as CC, createElement as el } from 'react'
import { render, RenderResult } from '@testing-library/react'

/**
 * element = <Target/>
 * Wrapperd = <Wrapper>{element}</Wrapper>
 */

interface Lookup<T = any> {
  [key: string]: T
}

interface State<Props> extends Lookup {
    element: JSX.Element | null
    Wrapper: string | FC<Lookup> | CC<Lookup>
    Target: string | FC<Props> | CC<Props>
    result: RenderResult
}

export class BaseController<Props extends Lookup=Lookup> {
    props: Partial<Props> = {}
    state: Partial<State<Partial<Props>>> = {}

    init (
        Target: typeof this.state.Target,
        Wrapper?: typeof this.state.Wrapper
    ): void

    init (Target: any, Wrapper?: any) {
        Object.assign(this.state, {Target, Wrapper})
    }

    set (props?: typeof this.props): void

    set (props?: any) {
        const { state: $ } = this
        this.props = props = props || this.props
        if ($.Target) this.render(el($.Target, props))
    }

    clean () {
        this.props = this.state = {}
    }

    render (element?: typeof this.state.element) {
        const { state: $ } = this
        $.element = element || $.element
        const wrapped = $.Wrapper? el($.Wrapper, {}, element): element
        if ($.result) return $.result.rerender(wrapped)
        if (wrapped) return $.result = render(wrapped)
    }
}
