/**
 * 3DMODEL LICENSE: CC Attribution
 *  - Chiel.van.Tongeren - DDJ_400
 *  - https://sketchfab.com/3d-models/ddj-400-49b2afe879d1475a95f8e799908ba562
 */

import React from 'react'
import Layout from '@theme/Layout'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { Nano } from '../../models'
import { LowHigh } from '../../components/LowHigh'

import { useFade, useNote, useTurn, useMidi } from 'use-midi/src'

const SRC = "img/assets/Nano.gltf"

export default function App () {
    const midi = useMidi({})

    const fade = useFade(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.z = state.value
    })

    const note = useNote(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.y = state.value
    })

    const turn = useTurn(state => {
        const { ref } = state
        if (ref.current)
            ref.current.position.y = -1
    })

    return (
      <Layout>
        <Flex>
          <Canvas style={{height: "50vh"}}camera={{position: [0, .3, 0]}}>
            <color attach="background" args={["#f2f2ff"]}/>
            <LowHigh binds={{fade, note, turn, midi}} low={Nano} src={SRC}/>
            <OrbitControls {...{enableRotate: false, minZoom: .1} as any}/>
            <ambientLight position={[0, 0, 0]} intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={20} color="#5a39a2" />
          </Canvas>
          <Title>use-midi</Title>
          <span>🖖@use-midi is a library that let you bind midi events to any component.</span>
          <Flex row pad>
            <Button pad href="https://tseijp.github.io/use-midi/documents/intro">
                Documentation
            </Button>
            <Button pad w href="https://github.com/tseijp/use-midi">
                Github
            </Button>
          </Flex>
        </Flex>
        <Flex row pad>
          <Flex pad>
            <SubTitle>Midi made simple</SubTitle>
            <SubText>
              👊 use-midi allows you to make it
            </SubText>
          </Flex>
          <Flex pad>
            <SubTitle>Midi made simple</SubTitle>
            <SubText>
              👊 use-midi allows you to make it
            </SubText>
          </Flex>
          <Flex pad>
            <SubTitle>Midi made simple</SubTitle>
            <SubText>
              👊 use-midi allows you to make it
            </SubText>
          </Flex>
        </Flex>
      </Layout>
    )
}

const Title = styled.h1`
    font-size: 5rem;
    color: orange;
`

const Button = styled.a.attrs(props => {
    if (props.w) {
        props.target = "_blank"
        props.rel = "noopener"
    }
    return props
})<any>`
    background-color: #0060ff;
    border-radius: 4px;
    cursor: pointer;
    padding: 16px 32px;
    border: none;
    color: white;
    font-size: 16px;
    outline: none;
    ${({w}) => w && `
        border: 1px #0060ff solid;
        background-color: white;
        color: #0060ff;
    `}
`;


const Flex = styled.div<any>`
    display: flex;
    width: 100%;
    margin: auto;
    ${({pad}) => pad && `padding: 2rem;`};
    ${({row}) => !row && `flex-direction: column;`}
    align-items: center;
    justify-content: center;
`

const SubTitle = styled.h3`
`

const SubText = styled.div`
`
