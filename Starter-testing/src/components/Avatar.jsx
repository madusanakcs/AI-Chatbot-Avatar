import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useGraph, useLoader } from '@react-three/fiber'
import { useAnimations, useGLTF, useFBX } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useControls } from 'leva'
import * as THREE from 'three'

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};


export function Avatar(props) {

  const { playAudio, script } = useControls({
    playAudio: false,
    script: { value: 'a', options: [ 'a','angry','happy'] },
  });

  // Dynamically set the audio source based on the script
  const audio = useMemo(() => new Audio(`/audios/${script}.mp3`), [script]);
  const jsonFile = useLoader(THREE.FileLoader, `/audios/${script}.json`)
  const lipsync = JSON.parse(jsonFile)

  useFrame(() => {
    const currentAudioTime = audio.currentTime;
    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0
      nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0
    });

    for (let i = 0; i < lipsync.mouthCues.length; i++) {
      const mouthCue = lipsync.mouthCues[i];
      if (currentAudioTime >= mouthCue.start && currentAudioTime <= mouthCue.end )
       {console.log(mouthCue.value);
        nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCue.value]]] = 1
        nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[corresponding[mouthCue.value]]] = 1
        break
      }
    }
  });
  
  // useEffect(() => {
  //   console.log(nodes.Wolf3D_Head.morphTargetDictionary)
  //   nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary['happy']] = 1
  //   nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary['happy']] = 1
  // }, []);


  
  useEffect(() => {
    const handleCanPlay = () => {
      if (playAudio) {
        audio.play();
      }
    };

    // Add event listener to ensure audio is ready before playing
    audio.addEventListener('canplaythrough', handleCanPlay);

    if (playAudio) {
      audio.load();  // Load the audio file
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.pause();
    };
  }, [playAudio, script, audio]);


  const { scene } = useGLTF('/models/66b63bfc7cae0765e81803b7 (3).glb')
  const { animations: IdleAnim } = useFBX('/animations/Idle.fbx')
  const { animations: AngryAnim } = useFBX('/animations/angry gesture.fbx')
  const { animations: HappyAnime } = useFBX('/animations/happy hand gesture.fbx')

  IdleAnim[0].name = 'Idle'
  AngryAnim[0].name = 'Angry'
  HappyAnime[0].name = 'Happy'

  const [animations, setAnimations] = useState('Happy')

  const group = useRef()
  const { actions } = useAnimations([IdleAnim[0], AngryAnim[0], HappyAnime[0]], group)

  useEffect(() => {
    if (actions[animations]) {
      actions[animations].reset().fadeIn(0.5).play()
    }
    return () => {
      if (actions[animations]) {
        actions[animations].fadeOut(0.5)
      }
    }
  }, [animations, actions])

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  
  return (
    <group {...props} dispose={null} ref={group}>
      {/* Ensure that all nodes and materials are defined and not null */}
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair?.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair?.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body?.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body?.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom?.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom?.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear?.geometry} material={materials['aleksandr@readyplayer']} skeleton={nodes.Wolf3D_Outfit_Footwear?.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top?.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top?.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft?.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft?.skeleton} morphTargetDictionary={nodes.EyeLeft?.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft?.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight?.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight?.skeleton} morphTargetDictionary={nodes.EyeRight?.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight?.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head?.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head?.skeleton} morphTargetDictionary={nodes.Wolf3D_Head?.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head?.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth?.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth?.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth?.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth?.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/models/xxx.glb')
