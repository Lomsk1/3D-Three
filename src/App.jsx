import { Fragment, Suspense } from "react";
import { CanvasTexture } from "three";
import Three from "./components/three";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
// npm install -g gltf-pipeline
// gltf-pipeline -i scene.gltf -o model.glb --draco.compressionLevel 10 -d -b
// npm i -g gltfjsx
// gltfjsx model.glb

  return (
    <Fragment>
      {/* We Need to Enable Shadows Everywhere */}
      <Canvas id='three-canvas-container' shadows>
        <Suspense fallback='null'>
          <Three />
        </Suspense>
      </Canvas>
    </Fragment>
  );
}

export default App;
