import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { createHeartGeometry } from './heartUtils'
import { useGiftMaterials } from './useGiftMaterials'

export function GiftBox({ open, onOpenLetter }) {
  const groupRef = useRef()
  const lidPivotRef = useRef()
  const glowRef = useRef()
  const letterRef = useRef()
  const letterMeshRef = useRef()
  const openProgress = useRef(0)

  const { bodyMaterial, lidMaterial, innerMaterial, ribbonMaterial, cardMaterial } = useGiftMaterials()

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
    const targetOpacity = Math.min(openProgress.current * 1.4, 1)
    if (letterMeshRef.current && letterMeshRef.current.material) {
      letterMeshRef.current.material.opacity = targetOpacity
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
          position={[0, 0, 0.012]}
          color="#b52b29"
          fontSize={0.12}
          maxWidth={1.35}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Haz click para leer una sorpresa.
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
