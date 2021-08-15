import React from 'react'
import Layout from '@theme/Layout'
import styled, {css} from 'styled-components'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Player} from '/components/Player'

export default function App () {
    const {siteConfig} = useDocusaurusContext()
    const [track1] = React.useState({title: '1'})
    return (
      <Layout>
        <Player track={track1}>
            <div>
              <Player.EffectPannel/>
                <button>FX1</button>
              <Player.WaveViewPannel/>
              <Player.WaveViewPannel/>
              <Player.JOGPannel/>
            </div>
            <Player.Container>
              <Player.PerformancePad/>
              <Player.MixerPannel/>
              <Player.PerformancePad/>
            </Player.Container>
            <div>
              <Player.EffectPannel/>
                <button>FX2</button>
              <Player.WaveViewPannel/>
              <Player.JOGPannel/>
            </div>
          <Player.HeadphonePannel/>
          <Player.RecordPannel/>
        </Player>
      </Layout>
    )
}

App.Layout = styled.div`
    display: flex;
    flex-direction: colum;
`
