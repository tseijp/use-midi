/**
 * 3DMODEL LICENSE: CC Attribution
 *  - Chiel.van.Tongeren - DDJ_400
 *  - https://sketchfab.com/3d-models/ddj-400-49b2afe879d1475a95f8e799908ba562
 */
import React from 'react'
import { useGesture } from '@use-gesture/react'
import * as FIBER from '@react-three/fiber'
import * as DREI from '@react-three/drei'
import { Home } from '../../components/Home'
import { Flex } from '../../components/Flex'
import { Nano } from '../../models'
import { useFade, useNote, useTurn, useMidi } from 'use-midi/src'

const SRC = "img/assets/Nano.gltf"

export default function App () {
    const bind = useGesture({
        onMove: () => void 0
    })

    const midi = useMidi({
        fade: () => {},
        note: () => {},
        turn: () => {}
    })

    const fade = useFade(state => {
        const { ref, value } = state
        ref.current.position.y = value / 100000
    })

    const note = useNote(state => {
        const { ref } = state
        ref.current.position.y = state.value
        console.log('HI')
    })

    const turn = useTurn(state => {
        const { ref } = state
        ref.current.position.y = -1
    })

    return (
      <Home>
        <Flex>
          <FIBER.Canvas style={{height: "50vh",  userSelect: 'none'}} camera={{position: [0, 0.3, 0]}} {...bind()}>
            <color attach="background" args={["#f2f2ff"]}/>
            <React.Suspense fallback={null}>
              <Nano src={SRC} binds={{fade, note, turn, midi}}/>
            </React.Suspense>
            <DREI.OrbitControls {...{enableRotate: false, minZoom: .1}}/>
            <ambientLight position={[0, 0, 0]} intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={20} color="#5a39a2" />
          </FIBER.Canvas>
          <Home.Title>use-midi</Home.Title>
          <span>🖖@use-midi is a library that let you bind midi events to any component.</span>
          <Flex row pad>
            <Home.Button href="https://tseijp.github.io/use-midi/documents/intro">
                Documentation
            </Home.Button>
            <Home.Button $w href="https://github.com/tseijp/use-midi">
                Github
            </Home.Button>
          </Flex>
        </Flex>
        <Flex row pad>
          <Flex pad>
            <Home.SubTitle>Midi made simple</Home.SubTitle>
            <Home.SubText>
              👊 use-midi allows you to make it
            </Home.SubText>
          </Flex>
          <Flex pad>
            <Home.SubTitle>Midi made simple</Home.SubTitle>
            <Home.SubText>
              👊 use-midi allows you to make it
            </Home.SubText>
          </Flex>
          <Flex pad>
            <Home.SubTitle>Midi made simple</Home.SubTitle>
            <Home.SubText>
              👊 use-midi allows you to make it
            </Home.SubText>
          </Flex>
        </Flex>
      </Home>
    )
}
