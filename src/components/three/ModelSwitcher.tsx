import {
  PresentationControls,
  type PresentationControlProps,
} from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook16";
import { Group, Mesh, type Object3DEventMap } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook14";

interface ModelSwitcherParams {
  scale: number;
  isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: Group<Object3DEventMap>, opacity: number) => {
  if (!group) return;

  group.traverse((child) => {
    if (child instanceof Mesh && child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const moveGroup = (group: Group<Object3DEventMap>, x: number) => {
  if (!group) return;
  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherParams) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const smallMacbookRef = useRef<Group<Object3DEventMap> | null>(null);
  const largeMacbookRef = useRef<Group<Object3DEventMap> | null>(null);

  const controlsConfig: PresentationControlProps = {
    snap: true,
    speed: 2,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
  };

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(
    () => {
      if (smallMacbookRef.current === null || largeMacbookRef.current === null)
        return;

      if (showLargeMacbook) {
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacbookRef.current, 0);
        fadeMeshes(smallMacbookRef.current, 0);
        fadeMeshes(largeMacbookRef.current, 1);
      } else {
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, -OFFSET_DISTANCE);
        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
      }
    },
    { dependencies: [showLargeMacbook] },
  );

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
