import React from 'react'
import styled from 'styled-components'
import { Any } from 'use-midi/src'

const rand = () => `background: ${'#' + (Math.random() * 0xffffff | 0).toString(16)};`

export function Player (props: Any) {
    return <React.Fragment {...props}/>
}

Player.EffectPannel = styled.div`${rand()}
    width: 100%;
    height: 100px;
`

Player.Container = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
`

Player.WaveViewPannel = styled.div`${rand()}
    width: 100%;
    height: 100%;
`

Player.PerformancePad = styled.div`${rand()}
    width: 48%;
    height: 100px;
`

Player.MixerPannel = styled.div`${rand()}
    width: auto;
    height: 100px
`

Player.Headphone = styled.div`${rand()}`

Player.JOGPannel = styled.div`${rand()}`

Player.SamplerDeck = styled.div`${rand()}`

Player.HeadphonePannel = styled.div`${rand()}`

Player.RecordPannel = styled.div`${rand()}`
