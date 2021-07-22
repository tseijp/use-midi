import React from 'react'
import Layout from '@theme/Layout'
import styled, {css} from 'styled-components'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Home} from '../../components/Home'
import {Live} from '../../components/Live'
import parsed from 'parsed-path'

export default function App () {
    const {siteConfig} = useDocusaurusContext()
    return (
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Home>
          <Home.Header>
            <h1>{'< 🖖 >'}</h1>
            <p>use</p>
            <p>midi</p>
          </Home.Header>
          <Live code={Code} noInline scope={{ React, Button, parsed }}>
            <Title>
              <Tagline></Tagline>
              <SupportingTagline>
              </SupportingTagline>
            </Title>
            <Live.Preview/>
            <Live.Container style={{maxWidth: "34rem"}}>
              <Live.Editor style={{minHeight: "27rem"}}/>
              <Live.Error style={{maxHeight: "20rem"}}/>
            </Live.Container>
          </Live>
        </Home>
      </Layout>
    );
}

const Code = `
const Github = parsed.https\`github.com\`\`tseijp\`\`use-midi\`
render(
  <Github as={Button}>
    Github
  </Github>
)
`.trim();

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props: any) => props.primary && css`
    background: white;
    color: black;
  `}
`

const Tagline = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`;

const SupportingTagline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
`;

const Title = styled.div`
  margin: 2rem 0;
  h1, h2 {
    margin: 0;
  }
`;
