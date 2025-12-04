import { useMemo } from 'react'
import * as THREE from 'three'

export function useGiftMaterials() {
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

  return { bodyMaterial, lidMaterial, innerMaterial, ribbonMaterial, cardMaterial }
}
