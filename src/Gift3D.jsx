import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { GiftBox } from './GiftBox'
import { SceneLights } from './SceneLights'
import { LetterModal } from './LetterModal'

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
        <SceneLights />

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
      <LetterModal show={showLetter} onClose={() => setShowLetter(false)} />
    </div>
  )
}

export default Gift3D
