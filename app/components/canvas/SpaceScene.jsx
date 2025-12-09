// app/components/canvas/SpaceScene.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    // Xoay khối cầu từ từ
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 200]} 
        scale={2.5}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#4f46e5" : "#220033"} // Đổi màu khi hover
          attach="material"
          distort={0.6} // Mức độ méo mó (hiệu ứng chất lỏng)
          speed={1.5}   // Tốc độ chuyển động bề mặt
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Component nền sao lấp lánh
function StarField() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Ánh sáng môi trường */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="purple" />
        
        {/* Các vật thể 3D */}
        <StarField />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}