import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, OrthographicCamera, Environment, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';

const chartData = [
  { name: '四类人员预警\n采集布控', total: 3, handled: 1 },
  { name: '四类人员信息\n采集布控', total: 2.5, handled: 0 },
  { name: '重点区域/场所\n人员预警管控', total: 0, handled: 1.5 },
];

const COLORS = {
  total: '#ef4444',     // Red  
  handled: '#3b82f6',   // Blue
};

// Y-Axis scale
const Y_MAX = 4;
const Y_STEPS = 4;

function Bubbles({ height, color }: { height: number, color: string }) {
  const bubblesRef = useRef<THREE.Group>(null);
  const bubbleData = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      x: (Math.random() - 0.5) * 0.28,
      y: Math.random() * height,
      z: (Math.random() - 0.5) * 0.28,
      scale: 0.006 + Math.random() * 0.014,
      speed: 0.3 + Math.random() * 0.9,
      wobbleSpeed: 1.2 + Math.random() * 2.8,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleAmount: 0.010 + Math.random() * 0.015
    }));
  }, [height]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((child, i) => {
        const bd = bubbleData[i];
        if (!bd) return;
        child.position.y += bd.speed * delta;
        child.position.x = bd.x + Math.sin(time * bd.wobbleSpeed + bd.wobbleOffset) * bd.wobbleAmount;
        child.position.z = bd.z + Math.cos(time * bd.wobbleSpeed * 0.8 + bd.wobbleOffset) * bd.wobbleAmount;
        if (child.position.y > height / 2 - 0.1) {
          child.position.y = -height / 2 + 0.1;
          child.position.x = bd.x;
          child.position.z = bd.z;
        }
      });
    }
  });

  return (
    <group ref={bubblesRef}>
      {bubbleData.map((b, i) => (
        <mesh key={i} position={[b.x, b.y - height/2, b.z]} scale={b.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial 
             color="#ffffff" 
             transparent 
             opacity={0.88} 
             transmission={0.92} 
             roughness={0} 
             ior={1.12} 
          />
        </mesh>
      ))}
    </group>
  );
}

function Bar3D({ position, height, color, label }: { position: [number, number, number], height: number, color: string, label?: string }) {
  const liquidRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (liquidRef.current) {
      liquidRef.current.scale.y = THREE.MathUtils.lerp(liquidRef.current.scale.y, 1, 0.05);
    }
  });

  const isTotal = color === COLORS.total;
  const badgeColorClass = isTotal 
    ? 'border-red-500/50 bg-red-950/85 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
    : 'border-blue-500/50 bg-blue-950/85 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.4)]';
  const dotColorClass = isTotal ? 'bg-red-400 animate-pulse' : 'bg-blue-400 animate-pulse';

  // Dynamic glass height based on liquid value so that it doesn't always stretch to the top ceiling
  const glassHeight = height > 0 ? height + 0.25 : 0.40;
  const outerRadius = 0.24;
  const innerRadius = 0.20;
  const baseRadius = 0.27;

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Outer Glass Container */}
      <mesh position={[0, glassHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[outerRadius, outerRadius, glassHeight, 32]} />
        <meshPhysicalMaterial 
           color="#ffffff" 
           transparent 
           opacity={0.25}
           roughness={0.03}
           clearcoat={1}
           clearcoatRoughness={0.05}
           metalness={0.1}
           transmission={0.96}
           ior={1.42}
           side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Glass Base and Rim */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, 0.08, 32]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.45} roughness={0.15} />
      </mesh>
      
      {/* Inner Liquid */}
      {height > 0 && (
         <group position={[0, height / 2, 0]}>
            <mesh ref={liquidRef} scale={[1, 0.01, 1]} receiveShadow>
               <cylinderGeometry args={[innerRadius, innerRadius, height, 32]} />
               <meshPhysicalMaterial 
                  color={hovered ? '#ffffff' : color} 
                  transparent 
                  opacity={0.88}
                  roughness={0.08}
                  metalness={0.1}
                  transmission={0.65}
                  ior={1.22}
                  emissive={color}
                  emissiveIntensity={hovered ? 0.75 : 0.45}
               />
               <Bubbles height={height} color={color} />
            </mesh>
         </group>
      )}

      {/* Top Value Label overlay - Styled as glass HUD badge */}
      {height > 0 && (
         <Html position={[0, height + 0.38, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded border text-[11px] font-mono font-bold whitespace-nowrap transition-all duration-300 shadow-lg backdrop-blur-md ${badgeColorClass} ${hovered ? 'scale-110 border-white/60 text-white' : 'opacity-90'}`}>
               <span className={`w-1.5 h-1.5 rounded-full ${dotColorClass}`} />
               <span>{height}</span>
            </div>
         </Html>
      )}
    </group>
  );
}

function GridFloorAndWalls({ width, depth, height }: { width: number, depth: number, height: number }) {
  return (
    <group position={[-width/2, 0, -depth/2]}>
      {/* Floor */}
      <Grid 
        position={[width/2, 0, depth/2]} 
        args={[width, depth]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#1e3a8a" 
        sectionSize={1} 
        sectionThickness={1.5} 
        sectionColor="#3b82f6" 
        fadeDistance={20}
      />
      <mesh position={[width/2, -0.01, depth/2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial color="rgba(10,20,40,0.8)" transparent />
      </mesh>

      {/* Back Wall */}
      <Grid 
        position={[width/2, height/2, 0]} 
        rotation={[Math.PI / 2, 0, 0]} 
        args={[width, height]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#1e3a8a" 
        sectionSize={1} 
        sectionColor="rgba(59,130,246,0.3)" 
      />
      
      {/* Left Wall */}
      <Grid 
        position={[0, height/2, depth/2]} 
        rotation={[0, 0, -Math.PI / 2]} 
        args={[height, depth]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#1e3a8a" 
        sectionSize={1} 
        sectionColor="rgba(59,130,246,0.3)" 
      />

      {/* Y-Axis Labels on Left Wall */}
      {Array.from({ length: Y_STEPS + 1 }).map((_, i) => (
         <Html key={i} position={[-0.2, (i / Y_STEPS) * height, 0]} center transform style={{ pointerEvents: 'none' }}>
           <div className="text-[8px] text-blue-300/60 font-mono -translate-x-full">
             {((i / Y_STEPS) * Y_MAX).toFixed(1)}
           </div>
         </Html>
      ))}
    </group>
  );
}

function Scene() {
  const gapX = 1.4;
  const gapZ = 0.8;
  const offsetX = (chartData.length * gapX) / 2 - gapX / 2;
  const offsetZ = gapZ / 2;

  const w = chartData.length * gapX + 2.0;
  const d = 2.4;
  const h = Y_MAX + 0.5;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2} 
        castShadow 
      />
      <pointLight position={[-2, 6, -5]} intensity={1} color="#3b82f6" />
      <pointLight position={[5, 4, 5]} intensity={0.5} color="#ef4444" />

      <GridFloorAndWalls width={w} depth={d} height={h} />

      <group position={[0, 0, 0]}>
        {chartData.map((dataObj, i) => {
          const x = i * gapX - offsetX;
          return (
            <React.Fragment key={i}>
              <Bar3D position={[x, 0, -offsetZ]} height={dataObj.total} color={COLORS.total} />
              <Bar3D position={[x, 0, offsetZ]} height={dataObj.handled} color={COLORS.handled} />

              {/* X-Axis Labels - Beautiful horizontal billboard badges */}
              <Html
                position={[x, -0.4, offsetZ + 0.95]}
                center
                style={{ pointerEvents: 'none' }}
              >
                <div className="px-2 py-1 rounded border border-blue-500/20 bg-slate-950/95 text-[#cce3fd] text-[9px] font-sans font-medium text-center shadow-[0_4px_10px_rgba(0,0,0,0.7)] leading-normal w-[84px] whitespace-normal select-none relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-6 bg-blue-400/40" />
                  {dataObj.name.split('\n').map((line, lIdx) => (
                    <div key={lIdx} className="truncate" title={line}>{line}</div>
                  ))}
                </div>
              </Html>
            </React.Fragment>
          );
        })}
      </group>
    </>
  );
}

export default function ThreeDChartWidget() {
  return (
    <div className="w-full h-full relative z-30 flex flex-col justify-between border-y border-blue-500/20 bg-slate-950/20 overflow-hidden">
      {/* Legend Row (Non-absolute, separate flex row to completely avoid overlapping the columns) */}
      <div className="flex justify-end gap-4 px-4 py-1.5 bg-slate-950/45 border-b border-blue-500/10">
        <div className="flex items-center gap-1.5 flex-row">
           <div className="w-2.5 h-2.5 rounded-sm bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
           <span className="text-xs text-slate-300 font-medium select-none">总计</span>
        </div>
        <div className="flex items-center gap-1.5 flex-row">
           <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
           <span className="text-xs text-slate-300 font-medium select-none">处理</span>
        </div>
      </div>

      {/* Canvas Wrapper */}
      <div className="flex-grow flex-1 w-full relative min-h-[190px] h-full">
        <Canvas shadows camera={{ position: [0, 4.0, 7.8], fov: 32 }} dpr={[1, 2]}>
          <OrbitControls 
            target={[0, 1.2, 0]}
            enablePan={false} 
            enableZoom={true} 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 2.1} 
            minAzimuthAngle={-Math.PI / 3.5} 
            maxAzimuthAngle={Math.PI / 3.5} 
          />
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}
