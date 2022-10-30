import { Fragment, useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  useTexture
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import gsap from 'gsap'
import { Car } from "./car";

function Three() {
  // map - context
  // const colorMapTexture  = useTexture('j')

  // Code to move the camera around
  const orbitControlsRef = useRef(null);

  useFrame(state => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      // revolve round with mouse
      orbitControlsRef.current.setAzimuthalAngle(x * angleToRadians(20));
      //   vertical round with mouse
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });
  //

  // Animation
  const ballRef = useRef(null)
  useEffect(()=>{
    if(!!ballRef.current){
      console.log(ballRef.current)

      // Timeline
      const timeline = gsap.timeline({ paused: true})

      // X-axis motion
      gsap.to(ballRef.current.position, {
        x:1,
        duration:2,
        // modes
        ease: 'power2.out'
      })
      // gsap.from(ballRef.current.position, {
      //   x: -3
      // })

      // Y-axis motion
      gsap.to(ballRef.current.position, {
        y: 0.5,
        duration:1.5,
        ease: 'bounce.out'
      }, '<')

      timeline.play()
    }
  },[ballRef.current])


  // useEffect(() => {
  //   if (!!orbitControlsRef.current) {
  //     console.log(orbitControlsRef.current);
  //   }
  // }, [orbitControlsRef.current]);

  // 1. maxAzimuthAngle  - revolve (ბრუნვა)
  // 2. enableDamping - ...
  // 3.setPolarAngle - vertical rotation

  // it is the same as useFrame. but in react, we can use useFrame, not this one
  requestAnimationFrame(() => {});
  return (
    <Fragment>
      {/* We Need to Enable Shadows Everywhere */}

      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />
      {/* Ball */}
      <mesh position={[-2, 2.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' 
        // emissive={'#e900a3'} 
        metalness={0.6}
        roughness={0.2}
        />
      </mesh>

      {/* Car */}
      {/* <Car /> */}

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#1ea3d8'
        //  map={colorMapTexture}
        />
      </mesh>

      {/* Ambient Light */}
      <ambientLight args={["#ffffff", 0.25]} />

      {/* Directional Light */}
      {/* <directionalLight args={["#ffffff", 1]} position={[-3, 1, 0]} /> */}

      {/* Spot Light */}
      <spotLight
        args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]}
        position={[-4, 1, 0]}
        castShadow
      />

      {/* Environment --> sphere, around... */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='#2266cc' side={THREE.BackSide} />
        </mesh>
      </Environment>
    </Fragment>
  );
}

export default Three;
