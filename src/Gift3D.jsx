import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

function createHeartGeometry({ depth, bevel = 0.12, scaleXY = 0.12, scaleZ = 0.18 }) {
  const shape = new THREE.Shape()
  shape.moveTo(5, 5)
  shape.bezierCurveTo(5, 5, 4, 0, 0, 0)
  shape.bezierCurveTo(-6, 0, -6, 7, -6, 7)
  shape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19)
  shape.bezierCurveTo(12, 15.4, 16, 11, 16, 7)
  shape.bezierCurveTo(16, 7, 16, 0, 10, 0)
  shape.bezierCurveTo(7, 0, 5, 5, 5, 5)
  const extrudeSettings = {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 8,
    curveSegments: 42,
    steps: 2,
  }
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geo.rotateX(-Math.PI / 2)
  geo.scale(scaleXY, scaleZ, scaleXY)
  geo.center()
  geo.computeVertexNormals()
  return geo
}

function GiftBox({ open, onOpenLetter }) {
  const groupRef = useRef()
  const lidPivotRef = useRef()
  const glowRef = useRef()
  const letterRef = useRef()
  const letterMeshRef = useRef()
  const openProgress = useRef(0)
  const heartBase = useMemo(
    () => createHeartGeometry({ depth: 2.4, bevel: 0.18, scaleXY: 0.11, scaleZ: 0.36 }),
    [],
  )
  const heartLid = useMemo(
    () => createHeartGeometry({ depth: 0.7, bevel: 0.14, scaleXY: 0.112, scaleZ: 0.24 }),
    [],
  )
  const heartInset = useMemo(
    () => createHeartGeometry({ depth: 1.8, bevel: 0.08, scaleXY: 0.095, scaleZ: 0.28 }),
    [],
  )
  const ribbonBand = useMemo(
    () => createHeartGeometry({ depth: 0.24, bevel: 0.03, scaleXY: 0.118, scaleZ: 0.08 }),
    [],
  )
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e53935',
        roughness: 0.36,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.22,
        sheen: 0.4,
        sheenRoughness: 0.38,
        sheenColor: new THREE.Color('#ff8a80'),
        envMapIntensity: 1.1,
      }),
    [],
  )
  const lidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f64c45',
        roughness: 0.28,
        metalness: 0.16,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
        sheen: 0.45,
        sheenRoughness: 0.32,
        sheenColor: new THREE.Color('#ffc1b3'),
        envMapIntensity: 1.2,
      }),
    [],
  )
  const innerMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#b71c1c',
        roughness: 0.4,
        metalness: 0.05,
        clearcoat: 0.25,
        envMapIntensity: 0.6,
      }),
    [],
  )
  const ribbonMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e5e9f3',
        roughness: 0.14,
        metalness: 0.85,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        ior: 1.5,
        envMapIntensity: 1.6,
      }),
    [],
  )
  const cardMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#fff8f0',
        roughness: 0.6,
        metalness: 0.05,
        clearcoat: 0.12,
        emissive: '#fff4e6',
        emissiveIntensity: 0.08,
        transparent: true,
        opacity: 0,
      }),
    [],
  )
  
  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    openProgress.current = THREE.MathUtils.damp(openProgress.current, open ? 1 : 0, 4.5, delta)
    const lidRotation = THREE.MathUtils.lerp(0, Math.PI * 0.94, openProgress.current)

    groupRef.current.rotation.y = t * 0.22
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05

    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.set(0, lidRotation, 0)
    }
    if (glowRef.current) {
      glowRef.current.intensity = 0.2 + openProgress.current * 1.1
      glowRef.current.distance = 4 + openProgress.current * 3
    }
    if (letterRef.current) {
      const lift = THREE.MathUtils.lerp(0, 0.7, openProgress.current)
      const tilt = THREE.MathUtils.lerp(Math.PI / 16, Math.PI / 9, openProgress.current)
      letterRef.current.position.set(0, 0.48 + lift, 0.35)
      letterRef.current.rotation.set(tilt, Math.PI, 0)
      letterRef.current.visible = openProgress.current > 0.15
    }
    if (letterMeshRef.current && letterMeshRef.current.material) {
      letterMeshRef.current.material.opacity = Math.min(openProgress.current * 1.4, 1)
    }
  })

  return (
    <group ref={groupRef} castShadow receiveShadow>
      <mesh geometry={heartBase} material={bodyMaterial} castShadow receiveShadow />
      <mesh geometry={heartInset} material={innerMaterial} position={[0, 0.06, 0]} castShadow receiveShadow />
      <mesh geometry={ribbonBand} material={ribbonMaterial} position={[0, 0.18, 0]} castShadow receiveShadow />

      {/* Carta interior (escondida hasta abrir) */}
      <group ref={letterRef} visible={false}>
        <mesh
          ref={letterMeshRef}
          geometry={new THREE.PlaneGeometry(1.6, 1.1, 1, 1)}
          material={cardMaterial}
          castShadow
          receiveShadow
          onPointerDown={(e) => {
            e.stopPropagation()
            if (open) onOpenLetter?.()
          }}
          onPointerOver={(e) => e.stopPropagation()}
          onPointerEnter={(e) => e.stopPropagation()}
        />
        <Text
          position={[0, 0, 0.01]}
          color="#b52b29"
          fontSize={0.12}
          maxWidth={1.35}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Para Valentina: Perdoname.
          Te amo mucho y te quiero.
          Eres importante para mí.
        </Text>
      </group>

      <group ref={lidPivotRef} position={[-1.05, 0.42, 0]}>
        <mesh
          geometry={heartLid}
          material={lidMaterial}
          castShadow
          receiveShadow
          position={[1.05, 0.18, 0]}
        />
      </group>

      {/* Luz interior suave cuando se abre */}
      <pointLight ref={glowRef} position={[0, 0.2, 0]} color="#ffd7a8" intensity={0.2} distance={4} />
    </group>
  )
}

function Gift3D() {
  const [clicks, setClicks] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const isOpen = clicks >= 5

  const handleClick = () => {
    setClicks((count) => (count >= 5 ? count : count + 1))
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-white">
      <Canvas
        className="w-full h-full"
        shadows
        camera={{ position: [5.5, 4.2, 6.4], fov: 45 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onClick={handleClick}
      >
        {/* Luces principales */}
        <ambientLight intensity={0.22} />
        <directionalLight
          position={[6, 8, 6]}
          intensity={1.1}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0003}
        />
        <spotLight
          position={[-6, 9, -2]}
          angle={0.4}
          penumbra={0.9}
          intensity={1.1}
          color="#f8f6f0"
          castShadow
          shadow-bias={-0.0002}
        />
        <pointLight position={[0, 4, -6]} intensity={0.45} color="#7da0ff" />
        
        {/* Regalo 3D */}
        <GiftBox open={isOpen} onOpenLetter={() => setShowLetter(true)} />

        {/* Sombras de contacto para anclar el objeto */}
        <ContactShadows
          position={[0, -0.48, 0]}
          opacity={0.42}
          scale={8}
          blur={2.6}
          far={6}
          smooth={true}
        />

        {/* Ambiente HDRI suave */}
        <Environment preset="warehouse" blur={0.3} />
        
        {/* Controles de órbita para rotar con el mouse */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          target={[0, 0.35, 0]}
        />
      </Canvas>
      {showLetter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-[90%] p-8 rounded-2xl shadow-2xl text-center space-y-4">
            <div className="text-2xl font-semibold text-rose-600">Para Valentina</div>
            <p className="text-gray-700 leading-relaxed">
              Perdóname. Te amo mucho y te quiero. Eres inmensamente importante para mí y no quiero que lo dudes.
            </p>
            <button
              className="mt-2 px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
              onClick={() => setShowLetter(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gift3D
