declare module 'three' {
  const THREE: any;
  export = THREE;
}

declare module 'three/addons/loaders/GLTFLoader.js' {
  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: any) => void,
      onProgress?: (event: any) => void,
      onError?: (error: unknown) => void,
    ): void;
  }
}