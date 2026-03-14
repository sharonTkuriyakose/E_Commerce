import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useTexture, Plane, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const ImageModel = ({ imageUrl, position, rotation, scale }) => {
  const meshRef = useRef();
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale} ref={meshRef}>
        <Plane args={[3, 3]}>
          <meshStandardMaterial 
            map={texture} 
            transparent={true} 
            alphaTest={0.1}
            side={2}
          />
        </Plane>
      </group>
    </Float>
  );
};

const Scene = ({ onProductClick }) => {
  const handlePointerOver = () => document.body.style.cursor = 'pointer';
  const handlePointerOut = () => document.body.style.cursor = 'auto';

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00f0ff" />
      
      {/* Headphones Model (Left-ish) */}
      <group 
        onClick={() => onProductClick('headphones')}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <ImageModel 
          imageUrl="/images/products/headphones.png"
          position={[-2.5, 1.2, -1]}
          rotation={[0, 0.3, 0]}
          scale={1.3}
        />
      </group>

      {/* iPhone Model (Right-ish) */}
      <group 
        onClick={() => onProductClick('iphone')}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <ImageModel 
          imageUrl="/images/products/iphone.png"
          position={[2.5, -1.2, 1]}
          rotation={[0, -0.3, 0]}
          scale={1.6}
        />
      </group>

      <Environment preset="city" />
      <ContactShadows position={[1.5, -3, 0]} opacity={0.4} scale={20} blur={2} far={5} color="#00f0ff" />
    </>
  );
};

const Hero3D = () => {
  const navigate = useNavigate();
  // We'll need to fetch these or hardcode for now if we want instant fix
  // based on our seeder, we can get them dynamically in a real app
  // for this fix, we'll use a dynamic lookup or specific route

  const handleProductClick = async (type) => {
    document.body.style.cursor = 'auto';
    try {
      // Fetch products to find the right ID
      const res = await fetch('http://localhost:5001/api/products');
      const products = await res.json();
      
      const targetName = type === 'iphone' ? 'iPhone 15 Pro' : 'Sony WH-1000XM5';
      const target = products.find(p => p.name === targetName);
      
      if (target) {
        navigate(`/product/${target._id}`);
      } else {
        navigate('/products');
      }
    } catch (err) {
      navigate('/products');
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 mix-blend-screen overflow-visible">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="block w-full h-full">
        <Scene onProductClick={handleProductClick} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;
