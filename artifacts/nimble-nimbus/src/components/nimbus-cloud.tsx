import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type NimbusCloudProps = {
  className?: string;
};

export function NimbusCloud({ className = '' }: NimbusCloudProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: any = null;
    let frame = 0;
    let disposed = false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
      camera.position.set(0, 0.12, 2.7);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const ambient = new THREE.HemisphereLight(0xeaf2fd, 0x113264, 2.5);
      const key = new THREE.DirectionalLight(0x8ec5fc, 3);
      key.position.set(2, 3, 4);
      scene.add(ambient, key);

      const cloudGroup = new THREE.Group();
      cloudGroup.rotation.set(-0.08, 0.18, -0.05);
      scene.add(cloudGroup);
      const loader = new GLTFLoader();

      let loadedScene: any = null;
      let isAscending = false;
      let hasAscended = false;
      let ascensionStartTime = 0;

      const updateScroll = () => {
        if (!mount || !cloudGroup) return;
        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        const aspect = width / height;

        if (loadedScene) {
          const responsiveScale = aspect > 1.2 ? 0.42 : aspect > 0.85 ? 0.285 : 0.16;
          loadedScene.scale.setScalar(responsiveScale);
        }

        const startY = aspect > 1.2 ? 0.22 : aspect > 0.85 ? 0.36 : 0.44;
        const endY = aspect > 1.2 ? -0.30 : aspect > 0.85 ? -0.18 : -0.12;
        const startX = aspect > 1.2 ? 0.50 : aspect > 0.85 ? 0.18 : 0.08;

        const scrollY = window.scrollY;
        const thesisEl = document.querySelector('[data-testid="section-thesis"]');
        let targetScroll = window.innerHeight * 1.1;
        if (thesisEl) {
          const rect = thesisEl.getBoundingClientRect();
          const thesisMiddleDocY = scrollY + rect.top + (rect.height / 2);
          targetScroll = Math.max(300, thesisMiddleDocY - window.innerHeight / 2);
        }

        const rawProgress = scrollY / targetScroll;
        const progress = Math.max(0, Math.min(1, rawProgress));

        if (!reduceMotion) {
          if (rawProgress >= 1) {
            if (!hasAscended && !isAscending) {
              isAscending = true;
              hasAscended = true;
              ascensionStartTime = performance.now();
            }
          } else {
            hasAscended = false;
            isAscending = false;
            cloudGroup.position.x = startX;
            cloudGroup.position.y = startY + (endY - startY) * progress;
            const opacity = Math.max(0, Math.min(1, 1 - progress));
            mount.style.opacity = String(opacity);
          }
        }
      };

      const resize = () => {
        if (!renderer || !mount) return;
        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        const aspect = width / height;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        updateScroll();
      };

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        if (reduceMotion) return;
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.22;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.12;
      };
      const onScroll = () => {
        updateScroll();
      };
      const render = (time: number) => {
        if (disposed || !renderer) return;

        if (isAscending && !reduceMotion) {
          const width = mount?.clientWidth || 1;
          const height = mount?.clientHeight || 1;
          const aspect = width / height;
          const startY = aspect > 1.2 ? 0.22 : aspect > 0.85 ? 0.36 : 0.44;
          const endY = aspect > 1.2 ? -0.30 : aspect > 0.85 ? -0.18 : -0.12;

          const elapsed = time - ascensionStartTime;
          const riseProgress = Math.min(1, Math.max(0, elapsed / 1800));
          const ease = 1 - Math.pow(1 - riseProgress, 3);

          cloudGroup.position.y = endY + (startY - endY) * ease;
          const floatOpacity = 0.65 * Math.sin(riseProgress * Math.PI);
          if (mount) mount.style.opacity = String(floatOpacity);

          if (riseProgress >= 1) {
            isAscending = false;
            cloudGroup.position.y = startY;
            if (mount) mount.style.opacity = '0';
          }
        }

        if (!reduceMotion) {
          const targetRotY = 0.18 + pointer.x;
          const targetRotX = -0.08 + pointer.y;
          cloudGroup.rotation.y += (targetRotY - cloudGroup.rotation.y) * 0.018;
          cloudGroup.rotation.x += (targetRotX - cloudGroup.rotation.x) * 0.018;
          cloudGroup.position.z = Math.sin(time * 0.00035) * 0.035;
        }
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(render);
      };

      loader.load(
        '/nimbus-cloud.glb',
        (gltf: any) => {
          if (disposed) return;
          loadedScene = gltf.scene;
          loadedScene.position.set(0, 0, 0);
          loadedScene.traverse((object: any) => {
            if (object instanceof THREE.Mesh) {
              object.frustumCulled = false;
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material: any) => {
                if ('color' in material) material.color.set('#D4E5F9');
                if ('roughness' in material) material.roughness = 0.72;
                if ('metalness' in material) material.metalness = 0.08;
              });
            }
          });
          cloudGroup.add(loadedScene);
          resize();
          frame = window.requestAnimationFrame(render);
        },
        undefined,
        () => {
          if (!disposed) setFailed(true);
        },
      );

      resize();
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        disposed = true;
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('scroll', onScroll);
        renderer?.dispose();
        if (renderer?.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    } catch {
      setFailed(true);
      return undefined;
    }
  }, []);

  return (
    <div className={`hero-cloud ${className}`} aria-hidden="true" ref={mountRef}>
      {failed && <div className="cloud-fallback" />}
    </div>
  );
}