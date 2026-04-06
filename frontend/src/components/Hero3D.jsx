import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useTexture, Plane, Float, Points, PointMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Sparkles, Box, Layout } from 'lucide-react';

// Error Boundary Fallback Component
const HeroFallback = () => (
  <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-dark-bg overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-purple/10 opacity-50"></div>
    <div className="relative z-10 flex flex-col items-center gap-6 opacity-40">
       <div className="relative">
          <Box size={80} className="text-white animate-float" />
          <div className="absolute inset-0 blur-2xl bg-accent-blue/20"></div>
       </div>
       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">System Status: Active</p>
    </div>
  </div>
);

const GlowingParticles = ({ count = 500 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ImageModel = ({ imageUrl, position, rotation, scale, colorHint = "#00f0ff" }) => {
  const meshRef = useRef();
  const [hasError, setHasError] = useState(false);
  
  // Custom loader with error handling
  let texture = null;
  try {
    texture = useTexture(imageUrl);
  } catch (e) {
    if (!hasError) setHasError(true);
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
      meshRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.8} floatIntensity={1}>
      <group position={position} rotation={rotation} scale={scale} ref={meshRef}>
        <Plane args={[3, 3]}>
          {texture && !hasError ? (
            <meshStandardMaterial 
              map={texture} 
              transparent={true} 
              alphaTest={0.5}
              side={THREE.DoubleSide}
              emissive={colorHint}
              emissiveIntensity={0.4}
              onBeforeCompile={(shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                  '#include <map_fragment>',
                  `
                  #include <map_fragment>
                  // If the color is very bright (white background), discard it
                  if (diffuseColor.r > 0.92 && diffuseColor.g > 0.92 && diffuseColor.b > 0.92) {
                    discard;
                  }
                  `
                );
              }}
            />
          ) : (
            <meshStandardMaterial 
              color={colorHint}
              transparent={true}
              opacity={0.1}
              wireframe
              side={THREE.DoubleSide}
            />
          )}
        </Plane>
        {/* Glow Ring */}
        <mesh position={[0, 0, -0.1]}>
           <ringGeometry args={[1.4, 1.45, 64]} />
           <meshBasicMaterial color={colorHint} transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const Scene = ({ onProductClick }) => {
  const handlePointerOver = () => { if(typeof document !== 'undefined') document.body.style.cursor = 'pointer'; };
  const handlePointerOut = () => { if(typeof document !== 'undefined') document.body.style.cursor = 'auto'; };

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
      <pointLight position={[10, -10, 10]} intensity={1} color="#ff00e5" />
      
      <GlowingParticles count={800} />

      {/* Headphones Module */}
      <group 
        onClick={() => onProductClick('headphones')}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <ImageModel 
          imageUrl="/images/products/headphones.png"
          position={[-3, 1, -1]}
          rotation={[0, 0.4, 0]}
          scale={1.4}
          colorHint="#00f0ff"
        />
      </group>

      {/* Flagship Device Module */}
      <group 
        onClick={() => onProductClick('iphone')}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <ImageModel 
          imageUrl="/images/products/iphone.png"
          position={[3, -1, 1]}
          rotation={[0, -0.4, 0]}
          scale={1.8}
          colorHint="#ff00e5"
        />
      </group>

      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <HeroFallback />;
    return this.props.children;
  }
}

const Hero3D = () => {
  const navigate = useNavigate();

  const handleProductClick = async (type) => {
    if(typeof document !== 'undefined') document.body.style.cursor = 'auto';
    try {
      const res = await fetch('http://localhost:5001/api/products');
      const products = await res.json();
      const target = products.find(p => p.name.includes(type === 'iphone' ? 'iPhone' : 'Sony'));
      if (target) navigate(`/product/${target._id}`);
      else navigate('/products');
    } catch (err) {
      navigate('/products');
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 mix-blend-screen overflow-visible select-none pointer-events-auto">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene onProductClick={handleProductClick} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 2 - 0.3}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Hero3D;
