/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function (props: any) {
  const { src, button, slider, note, knob, native, ...other } = props
  const group = useRef()
  const buttonRef = useRef()
  const sliderRef = useRef()
  const noteRef = useRef()
  const knobRef = useRef()
  const nativeRef = useRef()
  const { nodes } = useGLTF(src) as any
  return (
    <group ref={group} {...props} dispose={null} position={[-0.06, 0, -0.19]} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={nativeRef} {...native(nativeRef)}>
        <mesh geometry={nodes.Case_Plane_1.geometry} material={nodes.Case_Plane_1.material} />
        <mesh geometry={nodes.Case_Plane_2.geometry} material={nodes.Case_Plane_2.material} />
      </group>
      <group ref={buttonRef} {...button(buttonRef)}>
        <mesh geometry={nodes.Buttons_2_Plane007_1.geometry} material={nodes.Buttons_2_Plane007_1.material} />
        <mesh geometry={nodes.Buttons_2_Plane007_2.geometry} material={nodes.Buttons_2_Plane007_2.material} />
      </group>
      <group ref={sliderRef} {...slider(sliderRef)}>
        <mesh geometry={nodes.Sliders_Plane039_1.geometry} material={nodes.Sliders_Plane039_1.material} />
        <mesh geometry={nodes.Sliders_Plane039_2.geometry} material={nodes.Sliders_Plane039_2.material} />
      </group>
      <group ref={noteRef} {...note(noteRef)}>
        <mesh geometry={nodes.Buttons_Plane031_1.geometry} material={nodes.Buttons_Plane031_1.material} />
        <mesh geometry={nodes.Buttons_Plane031_2.geometry} material={nodes.Buttons_Plane031_2.material} />
      </group>
      <group ref={knobRef} {...knob(knobRef)}>
        <mesh
          geometry={nodes.Potentiometers_Cylinder008.geometry}
          material={nodes.Potentiometers_Cylinder008.material}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Nano.gltf')
