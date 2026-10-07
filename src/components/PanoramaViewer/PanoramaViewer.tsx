import { OrbitControls, OrbitControlsProps } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type PanoramaViewerProps = {
  imageUrl: string;
};

function Controls(props: OrbitControlsProps) {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    ref.current?.update();
  });

  return <OrbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />;
}


function Dome({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={BackSide} />
    </mesh>
  );
}

const PanoramaViewer = ({ imageUrl }: PanoramaViewerProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Controls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Dome imageUrl={imageUrl} />
      </Suspense>
    </Canvas>
  );
};

export default PanoramaViewer;
