import React from 'react'
import { useSpring, animated } from '@react-spring/three'
import { MeshProps } from '@react-three/fiber'

export default function (props: MeshProps) {
    const [{z}, set] = useSpring({z: 0}, [])
    const bind = {
        onPointerDown: (e: Event) => {
            e.stopPropagation()
            set({z: -50})
        },
        onPointerUp: () => {
            set({z: 0})
        }
    }
    return <animated.mesh {...props} {...bind} position={z.to((v=1) => [0, 0, v])} />
}
