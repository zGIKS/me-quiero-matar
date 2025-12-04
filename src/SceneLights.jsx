export function SceneLights() {
  return (
    <>
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
    </>
  )
}