/*
[<>    Glibal Section    ]
Effect Pannel
>>>>>>>>>>>>>>>>>>>>>>>>>>
Wave View Pannel
>>>>>>>>>>>>>>>>>>>>>>>>>>
Performance pad | Mixer  |
    JOG Pannel  | Pannel |
Head phone pannel  Record pannel
Sampler Deck
*/

import React from 'react'
import styled from 'styled-components'

const rand = () => `background: ${'#' + (Math.random() * 0xffffff | 0).toString(16)};`

export function Player (props: any) {
    return <React.Fragment {...props}/>
}

Player.EffectPannel = styled.div<any>`${rand()}
    width: 100%;
    height: 100px;
`

Player.Container = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
`

Player.WaveViewPannel = styled.div<any>`${rand()}
    width: 100%;
    height: 100%;
`

Player.PerformancePad = styled.div<any>`${rand()}
    width: 48%;
    height: 100px;
`

Player.MixerPannel = styled.div<any>`${rand()}
    width: auto;
    height: 100px
`

Player.Headphone = styled.div<any>`${rand()}`

Player.JOGPannel = styled.div<any>`${rand()}`

Player.SamplerDeck = styled.div<any>`${rand()}`

Player.HeadphonePannel = styled.div<any>`${rand()}`

Player.RecordPannel = styled.div<any>`${rand()}`
