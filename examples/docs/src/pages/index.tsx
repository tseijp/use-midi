/**
 * 3DMODEL LICENSE: CC Attribution
 *  - Chiel.van.Tongeren - DDJ_400
 *  - https://sketchfab.com/3d-models/ddj-400-49b2afe879d1475a95f8e799908ba562
 */
import React from 'react'
import styled from 'styled-components'
import Layout from '@theme/Layout'
// import { Player } from '/components/Player'
import { Low, High, Nano } from '../../models'
import { LowHigh } from '../../components/LowHigh'
import { Canvas } from '@react-three/fiber'
import './styles.css'
import { useButton, useFader, useNote, useMidi } from 'use-midi/src'

export default function App () {
    const [pointer, setPointer] = React.useState(true)
    if (typeof window === "undefined")
        return null

    const button = useButton(state => {
        const { args: [ref] } = state
        console.log(ref)
        if (ref?.current)
            ref.current.position.y = 1//dragging? 1: hovering? .5: 0
    })

    const fader = useFader(state => {
        const { args: [ref] } = state
    })

    const note = useNote(state => {
        const { args: [ref] } = state
    })

    const knob = useNote(state => {
        const { args: [ref] } = state
    })

    const native = useMidi({
        onPointerUp: state => {
            console.log(state)
        }
    })

    return (
      <Layout>
        <Canvas camera={{position: [0, .4, 0]}}>
          {/*
          <LowHigh
            src-low="img/assets/Low.gltf"
            src-high="img/assets/High.gltf"
          />
          */}
          <LowHigh
            button={button}
            fader={fader}
            note={note}
            knob={knob}
            native={native}
            low={Nano} src="img/assets/Nano.gltf" position-z={-.2}/>
          <ambientLight position={[0, 0, 0]} intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={20} color="#5a39a2" />
        </Canvas>
      </Layout>
    )
}

/*
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
</Player>*/
