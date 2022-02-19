import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import React from 'react'
import theme from 'prism-react-renderer/themes/vsDark'
import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'
import { Any } from 'use-midi/src'

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const monospace = 'dm, monospace';
const headerFont = `"Avenir Next", ${bodyFont}`;
const sidebarWidth = 300;

type LiveProps = Partial<{
    children: null | JSX.Element | JSX.Element[]
    noInline: boolean
    code: string
    scope: Any
    // [key: string]: any
}>

type Live = {
    (props: LiveProps): null | JSX.Element
    Provider: (props: LiveProps) => null | JSX.Element
    Container: (props: LiveProps) => null | JSX.Element
    Editor: (props: LiveProps) => null | JSX.Element
    Error: (props: LiveProps) => null | JSX.Element
    Preview: (props: LiveProps) => null | JSX.Element
}

export const Live: Live = (props) => {
    const {children, noInline, scope, ...other} = props
    const code: string = React.useMemo(() => {
        return React.Children.toArray(children).find(Boolean)!?.toString().trim()
    }, [children])
    return (
      <Live.Provider {...{code, noInline, scope: {...scope, ...other} as Any}}>
        <Live.Container>
          <Live.Editor/>
          <Live.Error/>
        </Live.Container>
        <Live.Preview/>
      </Live.Provider>
    )
}

Live.Provider = styled(LiveProvider).attrs({theme})`
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;
  border-radius: ${rem(10)};
  transform: translateX(${p => (p.moveRight ? rem(sidebarWidth) : 0)});
  display: flex;
`

Live.Error = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${'#ff5555'};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`

Live.Editor = styled(LiveEditor)`
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  overflow-y: auto !important;
  overflow-x: hidden;
  white-space: pre-wrap;
  position: relative;
  border-radius: ${rem(10)};
  white-space: pre;
  cursor: text;
  width: 100%;
`

Live.Container = styled.div`
  width: 100%;
  text-align: left;
  display: inline-block;
  margin: ${rem(35)} 0;
  border-radius: ${rem(10)};
`

Live.Preview = styled(LivePreview)`
  border-radius: ${rem(10)};
  width: 100%;
  height: 600px;
`
