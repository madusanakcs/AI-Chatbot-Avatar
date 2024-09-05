import {
  ContactShadows,
  Stats,
} from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { ConvaiFPS } from './fps/convaiFPS';
import { Nikhil } from './models/Nikhil';
import { Ground } from './ground';
import { useThree } from '@react-three/fiber';

export const Experience = ({ client }) => {
  const [gravity, setGravity] = useState([0, 0, 0]);

  // Set the background color to black
  const { gl } = useThree();
  useEffect(() => {
    setGravity([0, -9.81, 0]);
    gl.setClearColor('#000000'); // Set background to black
  }, [gl]);

  return (
    <>
      {/* Remove Sky and set background color */}
      {/* lights */}
      <ambientLight intensity={0.006} />
      <hemisphereLight
        skyColor={'#000000'}
        groundColor={'#000000'}
        intensity={0.5}
        castShadow
      />
      <directionalLight
        position={[500, 100, 500]}
        color={'#fcf9d9'}
        intensity={1.4}
        castShadow
      />

      {/* models */}
      <Stats />
      <Suspense>
        <Physics gravity={gravity}>
          <ConvaiFPS />
          {/* Remove Sky component */}
          <Nikhil client={client} />

          {/* Use the Ground component */}
          <RigidBody type="fixed">
            <Ground />
            <CuboidCollider args={[5, 5, 0.1]} position={[0, 1.5, -3]} />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[0, 1.5, 4]}
              rotation={[-Math.PI / 8, 0, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[0, -0.2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[3, 1.5, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[-3, 1.5, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </RigidBody>
        </Physics>
      </Suspense>
      <ContactShadows opacity={0.7} />
    </>
  );
};
