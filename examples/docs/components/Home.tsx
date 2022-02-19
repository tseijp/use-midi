import React from 'react'
import Layout from '@theme/Layout'
import styled from 'styled-components'

type HomeProps = Partial<{
  children: React.ReactNode
}>

export interface Home {
    (props: HomeProps): null | JSX.Element
    Title: (props: HomeProps) => null | JSX.Element
    Button: (props: ButtonProps) => null | JSX.Element
    SubText: (props: HomeProps) => null | JSX.Element
    SubTitle: (props: HomeProps) => null | JSX.Element
}

export const Home: Home = ((props: HomeProps) => {
  return <Layout {...props}/>
}) as Home

Home.Title = styled.h1`
    font-size: 5rem;
    color: orange;
`

type ButtonProps = HomeProps & Partial<{
    $w: boolean
    rel: string
    href: string
    target: string
}>

Home.Button = styled.a.attrs<ButtonProps>(props => {
    if (props.$w) {
        props.target = "_blank"
        props.rel = "noopener"
    }
    return props
})<ButtonProps>`
    background-color: #0060ff;
    border-radius: 4px;
    cursor: pointer;
    padding: 16px 32px;
    border: none;
    color: white;
    font-size: 16px;
    outline: none;
    ${({$w}) => $w && `
        border: 1px #0060ff solid;
        background-color: white;
        color: #0060ff;
    `}
`;

Home.SubText = styled.div``

Home.SubTitle = styled.h3``
