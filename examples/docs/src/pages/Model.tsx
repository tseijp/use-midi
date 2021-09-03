/**
 * Auto-generated by: https://github.com/pmndrs/gltfjsx
 */

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh } from './Mesh'
export function Model (props: any) {
  const group = React.useRef()
  const { url, ...other } = props
  const { nodes, materials } = useGLTF(url) as any
  return (
    <group ref={group} {...other} dispose={null}>
      <group rotation-x={Math.PI / 2}>
        <Mesh geometry={nodes.Red_light_button_00.geometry} material={nodes.Red_light_button_00.material} />
        <Mesh geometry={nodes.Red_light_button_01.geometry} material={nodes.Red_light_button_01.material} />
        <Mesh geometry={nodes.Red_light_button_02.geometry} material={nodes.Red_light_button_02.material} />
        <Mesh geometry={nodes.Red_light_button_03.geometry} material={nodes.Red_light_button_03.material} />
        <Mesh geometry={nodes.Red_light_button_04.geometry} material={nodes.Red_light_button_04.material} />
        <Mesh geometry={nodes.Red_light_button_05.geometry} material={nodes.Red_light_button_05.material} />
        <Mesh geometry={nodes.Red_light_button_06.geometry} material={nodes.Red_light_button_06.material} />
        <Mesh geometry={nodes.Red_light_button_07.geometry} material={nodes.Red_light_button_07.material} />
        <Mesh geometry={nodes.Red_light_button_08.geometry} material={nodes.Red_light_button_08.material} />
        <Mesh geometry={nodes.Red_light_button_09.geometry} material={nodes.Red_light_button_09.material} />
        <Mesh geometry={nodes.Red_light_button_10.geometry} material={nodes.Red_light_button_10.material} />
        <Mesh geometry={nodes.Red_light_button_11.geometry} material={nodes.Red_light_button_11.material} />
        <Mesh geometry={nodes.Red_light_button_12.geometry} material={nodes.Red_light_button_12.material} />
        <Mesh geometry={nodes.Red_light_button_13.geometry} material={nodes.Red_light_button_13.material} />
        <Mesh geometry={nodes.Red_light_button_14.geometry} material={nodes.Red_light_button_14.material} />
        <Mesh geometry={nodes.Red_light_button_15.geometry} material={nodes.Red_light_button_15.material} />
        <Mesh geometry={nodes.Cue_metal_L.geometry} material={nodes.Cue_metal_L.material} />
        <Mesh geometry={nodes.PlayPause_L.geometry} material={nodes.PlayPause_L.material} />
        <Mesh geometry={nodes.PlayPause_R.geometry} material={nodes.PlayPause_R.material} />
        <Mesh geometry={nodes.Cue_metal_R.geometry} material={nodes.Cue_metal_R.material} />
        <Mesh geometry={nodes.Tempo_panel_L.geometry} material={nodes.Tempo_panel_L.material} />
        <Mesh geometry={nodes.Inst_buttons.geometry} material={nodes.Inst_buttons.material} />
        <Mesh geometry={nodes.Cue_orange_button_02.geometry} material={nodes.Cue_orange_button_02.material} />
        <Mesh geometry={nodes.Cue_orange_button_01.geometry} material={nodes.Cue_orange_button_01.material} />
        <Mesh geometry={nodes.Cue_orange_button_00.geometry} material={nodes.Cue_orange_button_00.material} />
        <Mesh geometry={nodes.Tempo_panel_R.geometry} material={nodes.Tempo_panel_R.material} />
        <Mesh geometry={nodes.DJ_Mixer_1.geometry} material={materials['Frame_plastic.001']} />
        <Mesh geometry={nodes.DJ_Mixer_2.geometry} material={materials['Back_plastic.001']} />
        <Mesh geometry={nodes.FX_Selecr_button.geometry} material={materials['rubber_FXSelect.001']} />
        <Mesh geometry={nodes.Release_button.geometry} material={materials['Blue_light.001']} />
        <Mesh geometry={nodes.Plate_diod.geometry} material={materials['Dark_plastic.001']} />
        <Mesh geometry={nodes.Light_diod.geometry} material={materials['Diod.001']}  />
        <Mesh geometry={nodes.Phones_jack_detail1.geometry} material={materials['METAL_jack_gold.001']} />
        <Mesh geometry={nodes.R_Jack_part017.geometry} material={materials['Paint_white.001']} />
        <Mesh geometry={nodes.R_Jack_part015.geometry} material={materials['Paint_red.001']} />
        <Mesh geometry={nodes.R_Jack_part016.geometry} material={materials['Metal_jack.001']} />
        <Mesh geometry={nodes.Front_panel.geometry} material={materials['Front_plastic.001']} />
        <Mesh geometry={nodes.Beat_plate.geometry} material={nodes.Beat_plate.material}  />
        <Mesh geometry={nodes.Master_plate.geometry} material={nodes.Master_plate.material} />
        <Mesh geometry={nodes.Controller_022_1.geometry} material={nodes.Controller_022_1.material} />
        <Mesh geometry={nodes.Controller_022_2.geometry} material={nodes.Controller_022_2.material} />
        <Mesh geometry={nodes.Plastic_caps.geometry} material={nodes.Plastic_caps.material} />
        <Mesh geometry={nodes.Plate_Center.geometry} material={nodes.Plate_Center.material} />
        <Mesh geometry={nodes.Glass_center.geometry} material={nodes.Glass_center.material} />
        <Mesh geometry={nodes.Master_button.geometry} material={nodes.Master_button.material} />
        <Mesh geometry={nodes.Phones_jack.geometry} material={nodes.Phones_jack.material} />
        <Mesh geometry={nodes.Beat_sync_button.geometry} material={nodes.Beat_sync_button.material} />
        <Mesh geometry={nodes.Glass_left.geometry} material={nodes.Glass_left.material}  />
        <Mesh geometry={nodes.Turn_Controller_plate_L.geometry} material={nodes.Turn_Controller_plate_L.material} />
        <Mesh geometry={nodes.Pad_button.geometry} material={nodes.Pad_button.material}  />
        <Mesh geometry={nodes.In_adjust_button.geometry} material={nodes.In_adjust_button.material} />
        <Mesh geometry={nodes.Active_loop_button.geometry} material={nodes.Active_loop_button.material} />
        <Mesh geometry={nodes.Call_button.geometry} material={nodes.Call_button.material} />
        <Mesh geometry={nodes.Phones_jack_detail2.geometry} material={nodes.Phones_jack_detail2.material} />
        <Mesh geometry={nodes.Metal_handle.geometry} material={nodes.Metal_handle.material} />
        <Mesh geometry={nodes.Plate_shift.geometry} material={nodes.Plate_shift.material} />
        <Mesh geometry={nodes.Shift_button_L.geometry} material={nodes.Shift_button_L.material} />
        <Mesh geometry={nodes.Screw.geometry} material={nodes.Screw.material}  />
        <Mesh geometry={nodes.Level_Control.geometry} material={nodes.Level_Control.material} />
        <Mesh geometry={nodes.USB_jack.geometry} material={nodes.USB_jack.material}  />
        <Mesh geometry={nodes.Tempo_controller_1.geometry} material={nodes.Tempo_controller_1.material} />
        <Mesh geometry={nodes.Tempo_controller_2.geometry} material={nodes.Tempo_controller_2.material} />
        <Mesh geometry={nodes.Turn_Controller_L.geometry} material={nodes.Turn_Controller_L.material} />
        <Mesh geometry={nodes.Plate_L.geometry} material={nodes.Plate_L.material}  />
        <Mesh geometry={nodes.Legs.geometry} material={nodes.Legs.material}  />
        <Mesh geometry={nodes.Glass_right.geometry} material={nodes.Glass_right.material} />
        <Mesh geometry={nodes.Turn_Controller_plate_R.geometry} material={nodes.Turn_Controller_plate_R.material} />
        <Mesh geometry={nodes.Out_adjust_button2.geometry} material={nodes.Out_adjust_button2.material} />
        <Mesh geometry={nodes.Plate_R.geometry} material={nodes.Plate_R.material}  />
        <Mesh geometry={nodes.In_adjust_button2.geometry} material={nodes.In_adjust_button2.material} />
        <Mesh geometry={nodes.Call_button2.geometry} material={nodes.Call_button2.material} />
        <Mesh geometry={nodes.Out_adjust_button.geometry} material={nodes.Out_adjust_button.material} />
        <Mesh geometry={nodes.Pad_button_right.geometry} material={nodes.Pad_button_right.material} />
        <Mesh geometry={nodes.Plate_shift_r.geometry} material={nodes.Plate_shift_r.material} />
        <Mesh geometry={nodes.Shift_button_R.geometry} material={nodes.Shift_button_R.material} />
        <Mesh geometry={nodes.PP_plate.geometry} material={nodes.PP_plate.material}  />
        <Mesh geometry={nodes.Tempo_controller002_1.geometry} material={nodes.Tempo_controller002_1.material} />
        <Mesh geometry={nodes.Tempo_controller002_2.geometry} material={nodes.Tempo_controller002_2.material} />
        <Mesh geometry={nodes.Metal_handle_right.geometry} material={nodes.Metal_handle_right.material} />
        <Mesh geometry={nodes.Effect_Controls_00_1.geometry} material={nodes.Effect_Controls_00_1.material} />
        <Mesh geometry={nodes.Effect_Controls_00_2.geometry} material={nodes.Effect_Controls_00_2.material} />
        <Mesh geometry={nodes.Effect_Controls_00_3.geometry} material={nodes.Effect_Controls_00_3.material} />
        <Mesh geometry={nodes.Effect_Controls_01_1.geometry} material={nodes.Effect_Controls_01_1.material} />
        <Mesh geometry={nodes.Effect_Controls_01_2.geometry} material={nodes.Effect_Controls_01_2.material} />
        <Mesh geometry={nodes.Effect_Controls_01_3.geometry} material={nodes.Effect_Controls_01_3.material} />
        <Mesh geometry={nodes.Effect_Controls_02_1.geometry} material={materials.Base_Metal} />
        <Mesh geometry={nodes.Effect_Controls_02_2.geometry} material={materials.Top} />
        <Mesh geometry={nodes.Effect_Controls_03_1.geometry} material={nodes.Effect_Controls_03_1.material} />
        <Mesh geometry={nodes.Effect_Controls_03_2.geometry} material={nodes.Effect_Controls_03_2.material} />
        <Mesh geometry={nodes.Effect_Controls_03_3.geometry} material={nodes.Effect_Controls_03_3.material} />
        <Mesh geometry={nodes.Effect_Controls_04_1.geometry} material={nodes.Effect_Controls_04_1.material} />
        <Mesh geometry={nodes.Effect_Controls_04_2.geometry} material={nodes.Effect_Controls_04_2.material} />
        <Mesh geometry={nodes.Effect_Controls_04_3.geometry} material={nodes.Effect_Controls_04_3.material} />
        <Mesh geometry={nodes.Effect_Controls_05_1.geometry} material={nodes.Effect_Controls_05_1.material} />
        <Mesh geometry={nodes.Effect_Controls_05_2.geometry} material={nodes.Effect_Controls_05_2.material} />
        <Mesh geometry={nodes.Effect_Controls_05_3.geometry} material={nodes.Effect_Controls_05_3.material} />
        <Mesh geometry={nodes.Effect_Controls_06_1.geometry} material={nodes.Effect_Controls_06_1.material} />
        <Mesh geometry={nodes.Effect_Controls_06_2.geometry} material={nodes.Effect_Controls_06_2.material} />
        <Mesh geometry={nodes.Effect_Controls_06_3.geometry} material={nodes.Effect_Controls_06_3.material} />
        <Mesh geometry={nodes.Effect_Controls_07_1.geometry} material={nodes.Effect_Controls_07_1.material} />
        <Mesh geometry={nodes.Effect_Controls_07_2.geometry} material={nodes.Effect_Controls_07_2.material} />
        <Mesh geometry={nodes.Effect_Controls_07_3.geometry} material={nodes.Effect_Controls_07_3.material} />
        <Mesh geometry={nodes.Effect_Controls_08_1.geometry} material={nodes.Effect_Controls_08_1.material} />
        <Mesh geometry={nodes.Effect_Controls_08_2.geometry} material={nodes.Effect_Controls_08_2.material} />
        <Mesh geometry={nodes.Effect_Controls_08_3.geometry} material={nodes.Effect_Controls_08_3.material} />
        <Mesh geometry={nodes.Effect_Controls_09_1.geometry} material={nodes.Effect_Controls_09_1.material} />
        <Mesh geometry={nodes.Effect_Controls_09_2.geometry} material={nodes.Effect_Controls_09_2.material} />
        <Mesh geometry={nodes.Effect_Controls_09_3.geometry} material={nodes.Effect_Controls_09_3.material} />
        <Mesh geometry={nodes.Effect_Controls_10_1.geometry} material={nodes.Effect_Controls_10_1.material} />
        <Mesh geometry={nodes.Effect_Controls_10_2.geometry} material={nodes.Effect_Controls_10_2.material} />
        <Mesh geometry={nodes.Effect_Controls_10_3.geometry} material={nodes.Effect_Controls_10_3.material} />
        <Mesh geometry={nodes.Effect_Controls_11_1.geometry} material={nodes.Effect_Controls_11_1.material} />
        <Mesh geometry={nodes.Effect_Controls_11_2.geometry} material={nodes.Effect_Controls_11_2.material} />
        <Mesh geometry={nodes.Effect_Controls_11_3.geometry} material={nodes.Effect_Controls_11_3.material} />
        <Mesh geometry={nodes.Effect_Controls_12_1.geometry} material={nodes.Effect_Controls_12_1.material} />
        <Mesh geometry={nodes.Effect_Controls_12_2.geometry} material={nodes.Effect_Controls_12_2.material} />
        <Mesh geometry={nodes.Effect_Controls_12_3.geometry} material={nodes.Effect_Controls_12_3.material} />
        <Mesh geometry={nodes.Effect_Controls_13_1.geometry} material={nodes.Effect_Controls_13_1.material} />
        <Mesh geometry={nodes.Effect_Controls_13_2.geometry} material={nodes.Effect_Controls_13_2.material} />
        <Mesh geometry={nodes.Effect_Controls_13_3.geometry} material={nodes.Effect_Controls_13_3.material} />
        <Mesh geometry={nodes.Effect_Controls_14_1.geometry} material={nodes.Effect_Controls_14_1.material} />
        <Mesh geometry={nodes.Effect_Controls_14_2.geometry} material={nodes.Effect_Controls_14_2.material} />
        <Mesh geometry={nodes.Effect_Controls_14_3.geometry} material={nodes.Effect_Controls_14_3.material} />
        <Mesh geometry={nodes.USB_plate.geometry} material={nodes.USB_plate.material}  />
        <Mesh geometry={nodes.DJ_controller_left_1.geometry} material={nodes.DJ_controller_left_1.material} />
        <Mesh geometry={nodes.DJ_controller_left_2.geometry} material={nodes.DJ_controller_left_2.material} />
        <Mesh geometry={nodes.DJ_controller_left_3.geometry} material={nodes.DJ_controller_left_3.material} />
        <Mesh geometry={nodes.PP1_plate.geometry} material={nodes.PP1_plate.material}  />
        <Mesh geometry={nodes.Active_loop_button2.geometry} material={nodes.Active_loop_button2.material} />
        <Mesh geometry={nodes.DJ_controller_right_1.geometry} material={nodes.DJ_controller_right_1.material} />
        <Mesh geometry={nodes.DJ_controller_right_2.geometry} material={nodes.DJ_controller_right_2.material} />
        <Mesh geometry={nodes.DJ_controller_right_3.geometry} material={nodes.DJ_controller_right_3.material} />
        <Mesh geometry={nodes.Turn_Controller_R.geometry} material={nodes.Turn_Controller_R.material} />
        <Mesh geometry={nodes.Beat_sync_button2.geometry} material={nodes.Beat_sync_button2.material} />
        <Mesh geometry={nodes.Bottom_part.geometry} material={nodes.Bottom_part.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/ddj400.gltf')
