import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useLipsync } from '../../hooks/useLipsync';
import { useHeadTracking } from '../../hooks/useHeadTracking';

export function Nikhil(props) {
  const { nodes, materials, scene } = useGLTF('/2.glb')
  const { animations } = useGLTF('/anim.glb');
  const nikhilRef = useRef()
  const { actions, mixer } = useAnimations(animations, nikhilRef);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === 'Idle') ? 'Idle' : animations[0].name // Check if Idle animation exists otherwise use first animation
  );
  const { client } = props;

  useEffect(() => {
    client?.convaiClient.current.sendTextChunk("");
    console.log(nodes.CC_Base_Body001.morphTargetDictionary)
  }, [])

  useEffect(() => {
    if (client?.isTalking) {
      setAnimation('Talking');
    } else {
      setAnimation('Idle');
    }
  }, [client?.isTalking]);
  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);


  useLipsync({ client, characterRef: nikhilRef, nodes, scene });
  useHeadTracking({ client, nodes });
  return (
    <group ref={nikhilRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="party-m-0001" scale={0.01}>
        <primitive object={nodes.CC_Base_BoneRoot} />
        <skinnedMesh geometry={nodes.High_Heels.geometry} material={materials['High_Heels.001']} skeleton={nodes.High_Heels.skeleton} />
        <skinnedMesh geometry={nodes.Knee_length_skirt.geometry} material={materials['Knee_length_skirt.001']} skeleton={nodes.Knee_length_skirt.skeleton} />
        <skinnedMesh geometry={nodes.Rolled_sleeves_shirt.geometry} material={materials['Rolled_sleeves_shirt.001']} skeleton={nodes.Rolled_sleeves_shirt.skeleton} />
        <skinnedMesh name="CC_Base_Tongue" geometry={nodes.CC_Base_Tongue.geometry} material={materials['Std_Tongue.001']} skeleton={nodes.CC_Base_Tongue.skeleton} morphTargetDictionary={nodes.CC_Base_Tongue.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Tongue.morphTargetInfluences} />
        <skinnedMesh geometry={nodes.CC_Base_Teeth001.geometry} material={materials['Std_Upper_Teeth.001']} skeleton={nodes.CC_Base_Teeth001.skeleton} />
        <skinnedMesh geometry={nodes.CC_Base_Teeth001_1.geometry} material={materials['Std_Lower_Teeth.001']} skeleton={nodes.CC_Base_Teeth001_1.skeleton} />
        <skinnedMesh name="CC_Base_Body001" geometry={nodes.CC_Base_Body001.geometry} material={materials['Std_Skin_Head.001']} skeleton={nodes.CC_Base_Body001.skeleton} morphTargetDictionary={nodes.CC_Base_Body001.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Body001_1" geometry={nodes.CC_Base_Body001_1.geometry} material={materials['Std_Skin_Body.001']} skeleton={nodes.CC_Base_Body001_1.skeleton} morphTargetDictionary={nodes.CC_Base_Body001_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001_1.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Body001_2" geometry={nodes.CC_Base_Body001_2.geometry} material={materials['Std_Skin_Arm.001']} skeleton={nodes.CC_Base_Body001_2.skeleton} morphTargetDictionary={nodes.CC_Base_Body001_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001_2.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Body001_3" geometry={nodes.CC_Base_Body001_3.geometry} material={materials['Std_Skin_Leg.001']} skeleton={nodes.CC_Base_Body001_3.skeleton} morphTargetDictionary={nodes.CC_Base_Body001_3.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001_3.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Body001_4" geometry={nodes.CC_Base_Body001_4.geometry} material={materials['Std_Nails.001']} skeleton={nodes.CC_Base_Body001_4.skeleton} morphTargetDictionary={nodes.CC_Base_Body001_4.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001_4.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Body001_5" geometry={nodes.CC_Base_Body001_5.geometry} material={materials['Std_Eyelash.001']} skeleton={nodes.CC_Base_Body001_5.skeleton} morphTargetDictionary={nodes.CC_Base_Body001_5.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Body001_5.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Eye001" geometry={nodes.CC_Base_Eye001.geometry} material={materials['Std_Eye_R.001']} skeleton={nodes.CC_Base_Eye001.skeleton} morphTargetDictionary={nodes.CC_Base_Eye001.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye001.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Eye001_1" geometry={nodes.CC_Base_Eye001_1.geometry} material={materials['Std_Cornea_R.001']} skeleton={nodes.CC_Base_Eye001_1.skeleton} morphTargetDictionary={nodes.CC_Base_Eye001_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye001_1.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Eye001_2" geometry={nodes.CC_Base_Eye001_2.geometry} material={materials['Std_Eye_L.001']} skeleton={nodes.CC_Base_Eye001_2.skeleton} morphTargetDictionary={nodes.CC_Base_Eye001_2.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye001_2.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_Eye001_3" geometry={nodes.CC_Base_Eye001_3.geometry} material={materials['Std_Cornea_L.001']} skeleton={nodes.CC_Base_Eye001_3.skeleton} morphTargetDictionary={nodes.CC_Base_Eye001_3.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_Eye001_3.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_TearLine001" geometry={nodes.CC_Base_TearLine001.geometry} material={materials['Std_Tearline_R.001']} skeleton={nodes.CC_Base_TearLine001.skeleton} morphTargetDictionary={nodes.CC_Base_TearLine001.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_TearLine001.morphTargetInfluences} />
        <skinnedMesh name="CC_Base_TearLine001_1" geometry={nodes.CC_Base_TearLine001_1.geometry} material={materials['Std_Tearline_L.001']} skeleton={nodes.CC_Base_TearLine001_1.skeleton} morphTargetDictionary={nodes.CC_Base_TearLine001_1.morphTargetDictionary} morphTargetInfluences={nodes.CC_Base_TearLine001_1.morphTargetInfluences} />
        <skinnedMesh name="Side_part_wavy001" geometry={nodes.Side_part_wavy001.geometry} material={materials['Scalp_Transparency.001']} skeleton={nodes.Side_part_wavy001.skeleton} morphTargetDictionary={nodes.Side_part_wavy001.morphTargetDictionary} morphTargetInfluences={nodes.Side_part_wavy001.morphTargetInfluences} />
        <skinnedMesh name="Side_part_wavy001_1" geometry={nodes.Side_part_wavy001_1.geometry} material={materials['Hair_Transparency.001']} skeleton={nodes.Side_part_wavy001_1.skeleton} morphTargetDictionary={nodes.Side_part_wavy001_1.morphTargetDictionary} morphTargetInfluences={nodes.Side_part_wavy001_1.morphTargetInfluences} />
      
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/2.glb')
