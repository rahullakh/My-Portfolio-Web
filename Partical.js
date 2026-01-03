import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = hex => {
  hex = hex.replace("#", "");
  const int = parseInt(hex, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255
  ];
};

export function initParticles({
  container,
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = defaultColors,
  particleBaseSize = 100,
  alphaParticles = false,
  disableRotation = false
}) {
  const renderer = new Renderer({ alpha: true });
  const gl = renderer.gl;
  container.appendChild(gl.canvas);
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl, { fov: 15 });
  camera.position.z = 20;

  const resize = () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
  };
  window.addEventListener("resize", resize);
  resize();

  const positions = new Float32Array(particleCount * 3);
  const randoms = new Float32Array(particleCount * 4);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions.set(
      [(Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)],
      i * 3
    );
    randoms.set(
      [Math.random(), Math.random(), Math.random(), Math.random()],
      i * 4
    );
    colors.set(
      hexToRgb(particleColors[Math.floor(Math.random() * particleColors.length)]),
      i * 3
    );
  }

  const geometry = new Geometry(gl, {
    position: { size: 3, data: positions },
    random: { size: 4, data: randoms },
    color: { size: 3, data: colors }
  });

  const program = new Program(gl, {
    vertex: `
      attribute vec3 position;
      attribute vec4 random;
      attribute vec3 color;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpread;
      uniform float uBaseSize;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec3 pos = position * uSpread;
        pos += sin(uTime + random.xyz) * 0.5;
        gl_PointSize = uBaseSize / length(pos);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragment: `
      precision highp float;
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uSpread: { value: particleSpread },
      uBaseSize: { value: particleBaseSize }
    },
    transparent: true
  });

  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

  let time = 0;
  function animate(t) {
    requestAnimationFrame(animate);
    time += speed * 0.01;
    program.uniforms.uTime.value = time;

    if (!disableRotation) {
      mesh.rotation.y += 0.001;
      mesh.rotation.x += 0.0005;
    }

    renderer.render({ scene: mesh, camera });
  }
  animate();
}
