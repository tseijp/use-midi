/**
 * 3DMODEL LICENSE: CC Attribution
 *  - Chiel.van.Tongeren - DDJ_400
 *  - https://sketchfab.com/3d-models/ddj-400-49b2afe879d1475a95f8e799908ba562
 */
import React from 'react'
import Layout from '@theme/Layout'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import './styles.css'
import { Nano } from '../../models'
import { LowHigh } from '../../components/LowHigh'

import { useFade, useNote, useTurn, useMidi } from 'use-midi/src'

const SRC = "img/assets/Nano.gltf"

export default function App () {
    const [ state, set ] = React.useState()
    /**
     *
     */
    const midi = useMidi({})
    /**
     *
     */
    const fade = useFade(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.z = state.value
    })
    /**
     *
     */
    const note = useNote(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.y = state.value
    })
    /**
     *
     */
    const turn = useTurn(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.y = 0
    })
    /**
     * render components
     */
    return (
      <Layout>
        <h1>{state}</h1>
        <Canvas camera={{position: [0, .3, 0]}}>
          <LowHigh binds={{fade, note, turn, midi}} low={Nano} src={SRC}/>
          <OrbitControls {...{enableRotate: false, minZoom: .1} as any}/>
          <ambientLight position={[0, 0, 0]} intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={20} color="#5a39a2" />
        </Canvas>
      </Layout>
    )
}
