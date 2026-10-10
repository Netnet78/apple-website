import { Canvas } from "@react-three/fiber";
import StudioLight from "./three/StudioLight";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { Group, type Object3DEventMap } from "three";
import { Suspense, useEffect, useRef } from "react";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import { useMacbookStore } from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef<Group<Object3DEventMap>>(null);
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const { setTexture } = useMacbookStore();

  // Pre-load all feature videos during component mount
  const preloadedVideos = useRef<HTMLVideoElement[]>([]);
  useEffect(() => {
    preloadedVideos.current = featureSequence.map((feature) => {
      const v = document.createElement("video");
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
      return v;
    });

    return () => {
      // Cleanup to free GPU/media decoder memory on mount
      preloadedVideos.current.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      preloadedVideos.current = [];
    };
  }, [featureSequence]);

  useGSAP(() => {
    // 3D Model animation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    // Sync the feature content
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 3D Spin animation
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    // Content & Texture Sync
    timeline
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0, delay: 1 })
      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0 })
      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 0 });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        // fallback={
        //   <Html>
        //     <h1 className="text-white text-3xl uppercase">Loading...</h1>
        //   </Html>
        // }
        fallback={null}
      >
        <MacbookModel scale={isMobile ? 0.08 : 0.1} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features" className="mb-16">
      <h2>See it all in a new light</h2>

      <Canvas id="feature-canvas" camera={{}}>
        <StudioLight />
        <ambientLight intensity={0.5} />

        {/* 3D Model */}
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
