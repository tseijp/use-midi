import React, { FC, ComponentClass as CC, createElement as el } from 'react'
import { render, RenderResult } from '@testing-library/react'

/**
 * element = <Target/>
 * Wrapperd = <Wrapper>{element}</Wrapper>
 */

function App () {
    // const memo = React.useMemo(() => [], [])
    return el('div')
}

interface Lookup<T = any> {
  [key: string]: T
}

interface _State<Props extends Lookup=Lookup> extends Lookup {
    element: JSX.Element | null
    Wrapper: string | FC<Lookup> | CC<Lookup>
    Target: string | FC<Props> | CC<Props>
    result: RenderResult
}

export class BaseController<
    Props extends Lookup = Lookup,
    State extends _State<Props> = _State<Props>
> {
    props: Props = {} as any
    state: State = {} as any

    init (Target: State['Target'], Wrapper?: State['Wrapper']): void

    init (Target: any, Wrapper?: any) {
        Object.assign(this.state, {Target, Wrapper})
    }

    set (props?: Props): void

    set (props?: any) {
        const { state: $ } = this
        this.props = props = props || this.props
        if ($.Target) this.render(el(App))//this.render(el($.Target, props))
    }

    clean () {
        this.props = this.state = {} as any
    }

    render (element?: State['element']) {
        const { state: $ } = this
        $.element = element || $.element
        const wrapped = $.Wrapper? el($.Wrapper, {}, element): element
        if ($.result) return $.result.rerender(wrapped)
        if (wrapped) return $.result = render(wrapped)
    }
}
