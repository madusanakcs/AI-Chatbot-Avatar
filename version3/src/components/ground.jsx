import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Ground(props) {
  const group = useRef();
  const { nodes, materials, scene } = useGLTF('/stage1.glb');

  useEffect(() => {
    if (group.current) {
      // Example of world transform
      group.current.position.set(0, -0.1, 0); // Move the ground down by 1 unit
      group.current.rotation.set(0, 0,0); // Rotate the ground: 90 degrees on the X-axis, 45 degrees on the Z-axis
      group.current.scale.set(0.4, 0.4, 0.4); // Uniform scaling (no change)
    }
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/stage1.glb');
