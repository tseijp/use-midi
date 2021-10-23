/**
 * 3DMODEL LICENSE: CC Attribution
 *  - Chiel.van.Tongeren - DDJ_400
 *  - https://sketchfab.com/3d-models/ddj-400-49b2afe879d1475a95f8e799908ba562
 */
import React from 'react'
import Layout from '@theme/Layout'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import './styles.css'
import { Nano } from '../../models'
import { LowHigh } from '../../components/LowHigh'
import { useButton, useSlider, useKnob, useNote, useMidi } from 'use-midi/src'

export default function App () {
    if (typeof window === "undefined")
        return null
    return (
      <Layout>
        <Canvas camera={{position: [0, .3, 0]}}>
          <Model src="img/assets/Nano.gltf"/>
          <OrbitControls {...{enableRotate: false, minZoom: .1} as any}/>
          <ambientLight position={[0, 0, 0]} intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={20} color="#5a39a2" />
        </Canvas>
      </Layout>
    )
}

function Model (props: any) {
    const { src } = props

    const native = useMidi({})

    const button = useButton(state => {
        console.log(1)
        move(state, 'position', 'y')
    })

    const slider = useSlider(state => {
        move(state, 'position', 'z')
    })

    const knob = useKnob(state => {
        move(state, 'position', 'y')
    })

    const note = useNote(state => {
        move(state, 'position', 'y')
    })

    return <LowHigh binds={{button, slider, note, knob, native}} low={Nano} src={src}/>
}

function move (state: any,  keys='', args='') {
    const { args: [ref] } = state
    if (!ref.current) return
    ref.current[keys][args] = state.data[0]
}
