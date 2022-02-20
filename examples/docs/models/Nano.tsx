/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { Fun } from 'use-midi/src'
import * as THREE from 'three'

type MeshProps = Partial<{
    b: Fun,
    i: number|string,
    j: number|string,
    g: THREE.BufferGeometry,
    m: THREE.Material
}>

function _ (props: MeshProps) {
    const { b, i, j, g, m } = props
    const ref = useRef()
    const state = b?.(() => ({ref, note: i || j, i, j}))
    return <mesh ref={ref} geometry={g} material={m} {...state}/>
}

type Binds = {[key: string]: Fun}

export default function (props: GroupProps & {src: string, binds: Binds}) {
  const { src, binds, ...other } = props
  const { note, fade, turn, midi } = binds
  const ref = useRef()
  // @ts-ignore
  const { nodes } = useGLTF(src)
  return (
    <group ref={ref} {...other} dispose={null}>
      <group position={[-0.06, 0, -0.19]} rotation={[Math.PI / 2, 0, 0]}>
        <_ b={midi} i="1" g={nodes.Case_Plane_1.geometry} m={nodes.Case_Plane_1.material} />
        <_ b={midi} i="2" g={nodes.Case_Plane_2.geometry} m={nodes.Case_Plane_2.material} />
        <_ b={fade} i="001" g={nodes.Faders_Plane001.geometry} m={nodes.Faders_Plane001.material} />
        <_ b={fade} j="001" g={nodes.Faders_Plane001_1.geometry} m={nodes.Faders_Plane001_1.material} />
        <_ b={fade} i="002" g={nodes.Faders_Plane002.geometry} m={nodes.Faders_Plane002.material} />
        <_ b={fade} j="002" g={nodes.Faders_Plane002_1.geometry} m={nodes.Faders_Plane002_1.material} />
        <_ b={fade} i="003" g={nodes.Faders_Plane003.geometry} m={nodes.Faders_Plane003.material} />
        <_ b={fade} j="003" g={nodes.Faders_Plane003_1.geometry} m={nodes.Faders_Plane003_1.material} />
        <_ b={fade} i="004" g={nodes.Faders_Plane004.geometry} m={nodes.Faders_Plane004.material} />
        <_ b={fade} j="004" g={nodes.Faders_Plane004_1.geometry} m={nodes.Faders_Plane004_1.material} />
        <_ b={fade} i="005" g={nodes.Faders_Plane005.geometry} m={nodes.Faders_Plane005.material} />
        <_ b={fade} j="005" g={nodes.Faders_Plane005_1.geometry} m={nodes.Faders_Plane005_1.material} />
        <_ b={fade} i="006" g={nodes.Faders_Plane006.geometry} m={nodes.Faders_Plane006.material} />
        <_ b={fade} j="006" g={nodes.Faders_Plane006_1.geometry} m={nodes.Faders_Plane006_1.material} />
        <_ b={fade} i="007" g={nodes.Faders_Plane007.geometry} m={nodes.Faders_Plane007.material} />
        <_ b={fade} j="007" g={nodes.Faders_Plane007_1.geometry} m={nodes.Faders_Plane007_1.material} />
        <_ b={fade} i="008" g={nodes.Faders_Plane008.geometry} m={nodes.Faders_Plane008.material} />
        <_ b={fade} j="008" g={nodes.Faders_Plane008_1.geometry} m={nodes.Faders_Plane008_1.material} />
        <_ b={note} i="001" g={nodes.Buttons_Plane001.geometry} m={nodes.Buttons_Plane001.material} />
        <_ b={note} j="001" g={nodes.Buttons_Plane001_1.geometry} m={nodes.Buttons_Plane001_1.material} />
        <_ b={note} i="002" g={nodes.Buttons_Plane002.geometry} m={nodes.Buttons_Plane002.material} />
        <_ b={note} j="002" g={nodes.Buttons_Plane002_1.geometry} m={nodes.Buttons_Plane002_1.material} />
        <_ b={note} i="003" g={nodes.Buttons_Plane003.geometry} m={nodes.Buttons_Plane003.material} />
        <_ b={note} j="003" g={nodes.Buttons_Plane003_1.geometry} m={nodes.Buttons_Plane003_1.material} />
        <_ b={note} i="004" g={nodes.Buttons_Plane004.geometry} m={nodes.Buttons_Plane004.material} />
        <_ b={note} j="004" g={nodes.Buttons_Plane004_1.geometry} m={nodes.Buttons_Plane004_1.material} />
        <_ b={note} i="005" g={nodes.Buttons_Plane005.geometry} m={nodes.Buttons_Plane005.material} />
        <_ b={note} j="005" g={nodes.Buttons_Plane005_1.geometry} m={nodes.Buttons_Plane005_1.material} />
        <_ b={note} i="006" g={nodes.Buttons_Plane006.geometry} m={nodes.Buttons_Plane006.material} />
        <_ b={note} j="006" g={nodes.Buttons_Plane006_1.geometry} m={nodes.Buttons_Plane006_1.material} />
        <_ b={note} i="007" g={nodes.Buttons_Plane007.geometry} m={nodes.Buttons_Plane007.material} />
        <_ b={note} j="007" g={nodes.Buttons_Plane007_1.geometry} m={nodes.Buttons_Plane007_1.material} />
        <_ b={note} i="008" g={nodes.Buttons_Plane008.geometry} m={nodes.Buttons_Plane008.material} />
        <_ b={note} j="008" g={nodes.Buttons_Plane008_1.geometry} m={nodes.Buttons_Plane008_1.material} />
        <_ b={note} i="009" g={nodes.Buttons_Plane009.geometry} m={nodes.Buttons_Plane009.material} />
        <_ b={note} j="009" g={nodes.Buttons_Plane009_1.geometry} m={nodes.Buttons_Plane009_1.material} />
        <_ b={note} i="010" g={nodes.Buttons_Plane010.geometry} m={nodes.Buttons_Plane010.material} />
        <_ b={note} j="010" g={nodes.Buttons_Plane010_1.geometry} m={nodes.Buttons_Plane010_1.material} />
        <_ b={note} i="011" g={nodes.Buttons_Plane011.geometry} m={nodes.Buttons_Plane011.material} />
        <_ b={note} j="011" g={nodes.Buttons_Plane011_1.geometry} m={nodes.Buttons_Plane011_1.material} />
        <_ b={note} i="012" g={nodes.Buttons_Plane012.geometry} m={nodes.Buttons_Plane012.material} />
        <_ b={note} j="012" g={nodes.Buttons_Plane012_1.geometry} m={nodes.Buttons_Plane012_1.material} />
        <_ b={note} i="013" g={nodes.Buttons_Plane013.geometry} m={nodes.Buttons_Plane013.material} />
        <_ b={note} j="013" g={nodes.Buttons_Plane013_1.geometry} m={nodes.Buttons_Plane013_1.material} />
        <_ b={note} i="014" g={nodes.Buttons_Plane014.geometry} m={nodes.Buttons_Plane014.material} />
        <_ b={note} j="014" g={nodes.Buttons_Plane014_1.geometry} m={nodes.Buttons_Plane014_1.material} />
        <_ b={note} i="015" g={nodes.Buttons_Plane015.geometry} m={nodes.Buttons_Plane015.material} />
        <_ b={note} j="015" g={nodes.Buttons_Plane015_1.geometry} m={nodes.Buttons_Plane015_1.material} />
        <_ b={note} i="016" g={nodes.Buttons_Plane016.geometry} m={nodes.Buttons_Plane016.material} />
        <_ b={note} j="016" g={nodes.Buttons_Plane016_1.geometry} m={nodes.Buttons_Plane016_1.material} />
        <_ b={note} i="017" g={nodes.Buttons_Plane017.geometry} m={nodes.Buttons_Plane017.material} />
        <_ b={note} j="017" g={nodes.Buttons_Plane017_1.geometry} m={nodes.Buttons_Plane017_1.material} />
        <_ b={note} i="018" g={nodes.Buttons_Plane018.geometry} m={nodes.Buttons_Plane018.material} />
        <_ b={note} j="018" g={nodes.Buttons_Plane018_1.geometry} m={nodes.Buttons_Plane018_1.material} />
        <_ b={note} i="019" g={nodes.Buttons_Plane019.geometry} m={nodes.Buttons_Plane019.material} />
        <_ b={note} j="019" g={nodes.Buttons_Plane019_1.geometry} m={nodes.Buttons_Plane019_1.material} />
        <_ b={note} i="020" g={nodes.Buttons_Plane020.geometry} m={nodes.Buttons_Plane020.material} />
        <_ b={note} j="020" g={nodes.Buttons_Plane020_1.geometry} m={nodes.Buttons_Plane020_1.material} />
        <_ b={note} i="021" g={nodes.Buttons_Plane021.geometry} m={nodes.Buttons_Plane021.material} />
        <_ b={note} j="021" g={nodes.Buttons_Plane021_1.geometry} m={nodes.Buttons_Plane021_1.material} />
        <_ b={note} i="022" g={nodes.Buttons_Plane022.geometry} m={nodes.Buttons_Plane022.material} />
        <_ b={note} j="022" g={nodes.Buttons_Plane022_1.geometry} m={nodes.Buttons_Plane022_1.material} />
        <_ b={note} i="023" g={nodes.Buttons_Plane023.geometry} m={nodes.Buttons_Plane023.material} />
        <_ b={note} j="023" g={nodes.Buttons_Plane023_1.geometry} m={nodes.Buttons_Plane023_1.material} />
        <_ b={note} i="024" g={nodes.Buttons_Plane024.geometry} m={nodes.Buttons_Plane024.material} />
        <_ b={note} j="024" g={nodes.Buttons_Plane024_1.geometry} m={nodes.Buttons_Plane024_1.material} />
        <_ b={note} i="001" g={nodes.Buttons_2_Plane001.geometry} m={nodes.Buttons_2_Plane001.material} />
        <_ b={note} j="001" g={nodes.Buttons_2_Plane001_1.geometry} m={nodes.Buttons_2_Plane001_1.material} />
        <_ b={note} i="002" g={nodes.Buttons_2_Plane002.geometry} m={nodes.Buttons_2_Plane002.material} />
        <_ b={note} j="002" g={nodes.Buttons_2_Plane002_1.geometry} m={nodes.Buttons_2_Plane002_1.material} />
        <_ b={note} i="003" g={nodes.Buttons_2_Plane003.geometry} m={nodes.Buttons_2_Plane003.material} />
        <_ b={note} j="003" g={nodes.Buttons_2_Plane003_1.geometry} m={nodes.Buttons_2_Plane003_1.material} />
        <_ b={note} i="004" g={nodes.Buttons_2_Plane004.geometry} m={nodes.Buttons_2_Plane004.material} />
        <_ b={note} j="004" g={nodes.Buttons_2_Plane004_1.geometry} m={nodes.Buttons_2_Plane004_1.material} />
        <_ b={note} i="005" g={nodes.Buttons_2_Plane005.geometry} m={nodes.Buttons_2_Plane005.material} />
        <_ b={note} j="005" g={nodes.Buttons_2_Plane005_1.geometry} m={nodes.Buttons_2_Plane005_1.material} />
        <_ b={turn} i="1" g={nodes.Potentiometer1.geometry} m={nodes.Potentiometer1.material} />
        <_ b={turn} i="2" g={nodes.Potentiometer2.geometry} m={nodes.Potentiometer2.material} />
        <_ b={turn} i="3" g={nodes.Potentiometer3.geometry} m={nodes.Potentiometer3.material} />
        <_ b={turn} i="4" g={nodes.Potentiometer4.geometry} m={nodes.Potentiometer4.material} />
        <_ b={turn} i="5" g={nodes.Potentiometer5.geometry} m={nodes.Potentiometer5.material} />
        <_ b={turn} i="6" g={nodes.Potentiometer6.geometry} m={nodes.Potentiometer6.material} />
        <_ b={turn} i="7" g={nodes.Potentiometer7.geometry} m={nodes.Potentiometer7.material} />
        <_ b={turn} i="8" g={nodes.Potentiometer8.geometry} m={nodes.Potentiometer8.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/Nano.gltf')