import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function createHeartGeometry({ depth, bevel = 0.12, scaleXY = 0.12, scaleZ = 0.18 }) {
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