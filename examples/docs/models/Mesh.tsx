import React from 'react'
import {useSpring, animated} from '@react-spring/three'

export default function (props: any) {
    const { ...other } = props
    const [spring, set] = useSpring({x: 0, y: 0, z: 0}, [])
    const bind = () => ({
        position: spring.z.to((v=1) => [0, 0, v]),
        onPointerDown: (e: any) => {
            e.stopPropagation()
            set({z: -50})
        },
        onPointerUp: () => {
            set({z: 0})
        }
    })
    return <animated.mesh {...other} {...bind()}/>
}
