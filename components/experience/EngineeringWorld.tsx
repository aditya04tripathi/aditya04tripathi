"use client"

import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
  type ReactNode,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Image from "next/image"
import { skillLayers } from "@/data/portfolio"
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  MathUtils,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three"

export type EngineeringWorldProps = {
  chapter: number
  progress: number
  reducedMotion: boolean
  paused: boolean
  theme: "dark" | "light"
  selectedTechnology?: string
  journeyMode?: "horizontal"
  journeyProgress?: RefObject<number>
  projectStep?: number
}

type NetworkNode = {
  position: Vector3
  radius: number
  tone: number
}

type Network = {
  nodes: NetworkNode[]
  edges: [number, number][]
  core: Vector3
  coreScale: number
}

const NODE_COUNT = 42
const EDGE_COUNT = 120
const TECHNOLOGIES = skillLayers.flatMap((layer) =>
  layer.technologies.map((technology) => technology.name)
)
const SCENE_PALETTES = {
  dark: {
    background: "#0c0e14",
    foreground: "#f2f2f6",
    primary: "#8ab9ff",
    secondary: "#bfd7ff",
    signal: "#a5e5b8",
    core: "#252f43",
    node: "#c1dcff",
    connection: "#b6d2ff",
    surface: "#151923",
    rim: "#739ed5",
    file: "#c5e2ff",
    fileEmission: "#8dbbe7",
    keyLight: "#edf5ff",
    fillLight: "#9fc0ea",
  },
  light: {
    background: "#f5f6fa",
    foreground: "#171923",
    primary: "#2467ce",
    secondary: "#6c7f99",
    signal: "#24764a",
    core: "#bcc9dd",
    node: "#4d84d6",
    connection: "#6c8aac",
    surface: "#ebedf4",
    rim: "#a7c3e6",
    file: "#7eabd5",
    fileEmission: "#427ea9",
    keyLight: "#ffffff",
    fillLight: "#9fc0ea",
  },
}
type ScenePalette = (typeof SCENE_PALETTES)["dark"]
const PROJECT_STAGE_NODES = [
  [[], [1, 4, 7, 10], [2, 5, 8, 11], [0, 3, 6, 9, 12], [0, 14, 15], [13]],
  [[], [0], [1], [2, 5], [1, 3], [3, 4]],
  [[], [0, 1], [1, 2, 3, 8], [2, 9], [3, 4, 9], [4, 5]],
  [[], [0], [1, 2, 3, 4, 5, 6], [7, 8], [7, 8, 9], [9]],
]
const PROJECT_STAGE_EDGES = [
  [
    [],
    [0, 3, 6, 9],
    [1, 4, 7, 10],
    [2, 5, 8, 11],
    [13, 14, 15, 16],
    [12, 15, 16],
  ],
  [[], [0, 1], [0], [1, 2, 3], [4], [5]],
  [[], [0, 8], [0, 1, 2, 9], [11], [12, 13], [3, 4, 12]],
  [[], [0, 1], [2, 3, 4, 5, 12], [6, 7, 8, 9], [10, 11], [10, 11]],
]

function stageWeight(stages: number[][], stage: number, index: number) {
  return stage === 0 || stages[stage].includes(index) ? 1 : 0.24
}

function stageCenter(
  network: Network,
  stages: number[][],
  stage: number,
  target: Vector3
) {
  target.set(0, 0, 0)
  if (stage === 0) return target
  stages[stage].forEach((index) => target.add(network.nodes[index].position))
  return target.divideScalar(Math.max(1, stages[stage].length))
}

function node(x: number, y: number, z: number, radius = 0.065, tone = 0) {
  return { position: new Vector3(x, y, z), radius, tone }
}

function buildNetwork(
  chapter: number,
  mobile: boolean,
  horizontal = false
): Network {
  const nodes: NetworkNode[] = []
  const edges: [number, number][] = []
  let core = new Vector3()
  let coreScale = 1

  if (chapter === 0) {
    const count = mobile ? 24 : 34
    const angle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      nodes.push(
        node(
          Math.cos(angle * i) * radius * 2.06,
          y * 2.06,
          Math.sin(angle * i) * radius * 2.06,
          i % 7 === 0 ? 0.092 : 0.042 + (i % 3) * 0.01,
          i % 9 === 0 ? 1 : 0
        )
      )
    }
    const pairs = new Set<string>()
    nodes.forEach((current, i) => {
      const nearby = nodes
        .map((candidate, j) => ({
          j,
          distance: current.position.distanceToSquared(candidate.position),
        }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, mobile ? 2 : 3)
      nearby.forEach(({ j }) => {
        const a = Math.min(i, j)
        const b = Math.max(i, j)
        const key = `${a}:${b}`
        if (!pairs.has(key)) {
          pairs.add(key)
          edges.push([a, b])
        }
      })
    })
    const satellites = mobile
      ? [
          [2.65, 0.7, 0.6],
          [-2.4, -1.3, 0.3],
          [0.9, 2.55, -0.2],
        ]
      : [
          [2.8, 0.7, 0.6],
          [-2.55, -1.3, 0.3],
          [0.9, 2.6, -0.2],
          [-1.9, 2.0, -0.6],
          [2.0, -2.0, -0.3],
          [0.6, -2.65, 0.2],
        ]
    satellites.forEach(([x, y, z], i) => {
      nodes.push(node(x, y, z, i === 0 ? 0.105 : 0.06, i === 0 ? 1 : 0))
      edges.push([count + i, (i * 5 + 3) % count])
    })
  } else if (chapter === 1) {
    core = new Vector3(0.6, 0, 0)
    coreScale = 0.45
    nodes.push(node(0.6, 0, 0, 0.14, 1))
    ;[-1.55, -0.55, 0.55, 1.55].forEach((y, i) => {
      nodes.push(node(-2.5, y, i % 2 ? -0.4 : 0.45, 0.115, i === 3 ? 1 : 0))
      nodes.push(node(-1.4, y * 0.9, i % 2 ? -0.4 : 0.45, 0.075))
      nodes.push(node(-0.5, y * 0.55, i % 2 ? -0.2 : 0.25, 0.055))
      const start = 1 + i * 3
      edges.push([start, start + 1], [start + 1, start + 2], [start + 2, 0])
    })
    nodes.push(
      node(2.4, 0, 0, 0.14, 1),
      node(1.75, 1.2, -0.3, 0.05),
      node(1.75, -1.2, 0.3, 0.05)
    )
    edges.push([0, 13], [0, 14], [0, 15], [14, 13], [15, 13])
  } else if (chapter === 2) {
    coreScale = 0
    nodes.push(
      node(-2.5, 0.3, 0.1, 0.15, 1),
      node(0.85, 0.3, 0, 0.045),
      node(-0.75, 1.6, -0.25, 0.1),
      node(2.0, 1.6, 0, 0.085, 1),
      node(2.35, -0.9, 0.1, 0.07),
      node(-1.5, -1.35, -0.4, 0.06)
    )
    if (horizontal) {
      nodes[2].position.x = 0.05
      nodes[5].position.x = 1.55
    }
    if (horizontal) edges.push([0, 1], [0, 2], [2, 5], [5, 1], [1, 3], [3, 4])
    else edges.push([0, 1], [0, 2], [2, 1], [1, 3], [1, 4], [0, 5])
  } else if (chapter === 3) {
    coreScale = 0
    nodes.push(
      node(-2.6, 0.65, 0, 0.14, 1),
      node(-1.3, 1.65, -0.3, 0.09),
      node(0.3, 1.0, 0.45, 0.13),
      node(1.95, 1.6, -0.2, 0.085),
      node(2.65, 0.1, 0.25, 0.14, 1),
      node(1.4, -1.25, -0.3, 0.1),
      node(-0.2, -1.6, 0.3, 0.12),
      node(-1.85, -0.8, -0.3, 0.085),
      node(-0.65, 0.0, -0.7, 0.05),
      node(0.95, -0.05, 0.7, 0.065)
    )
    edges.push(
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 0],
      [0, 8],
      [8, 2],
      [8, 6],
      [2, 9],
      [9, 4],
      [9, 5]
    )
  } else if (chapter === 4) {
    core = new Vector3(-2.5, 0, 0)
    coreScale = 0.22
    nodes.push(
      node(-2.5, 0, 0, 0.12, 1),
      node(-1.25, 1.25, -0.2, 0.09),
      node(-1.25, -1.25, 0.2, 0.09),
      node(0.0, 1.85, 0.2, 0.06),
      node(0.0, 0.65, -0.3, 0.08),
      node(0.0, -0.65, 0.3, 0.08),
      node(0.0, -1.85, -0.2, 0.06),
      node(1.3, 1.1, 0.15, 0.095),
      node(1.3, -1.1, -0.15, 0.095),
      node(2.6, 0, 0, 0.14, 1)
    )
    edges.push(
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
      [3, 7],
      [4, 7],
      [5, 8],
      [6, 8],
      [7, 9],
      [8, 9],
      [4, 5]
    )
  } else if (chapter === 5) {
    core = new Vector3(-2.65, -1.4, 0.3)
    coreScale = 0.15
    nodes.push(
      node(-2.65, -1.4, 0.3, 0.09),
      node(-1.4, -0.5, -0.2, 0.12),
      node(-0.15, 0.3, 0.0, 0.17, 1),
      node(1.2, 1.0, -0.2, 0.17),
      node(2.65, 1.5, 0.3, 0.12, 1)
    )
    edges.push([0, 1], [1, 2], [2, 3], [3, 4])
    for (let i = 0; i < (mobile ? 8 : 16); i++) {
      const anchor = i < 8 ? 2 : 3
      const angle = ((i % 8) * Math.PI) / 4
      const center = nodes[anchor].position
      nodes.push(
        node(
          center.x + Math.cos(angle) * 0.9,
          center.y + Math.sin(angle) * 0.85,
          -0.75 + (i % 3) * 0.5,
          0.04
        )
      )
      edges.push([anchor, nodes.length - 1])
    }
  } else if (chapter === 6) {
    coreScale = 0.4
    nodes.push(node(0, 0, 0, 0.105, 1))
    const count = mobile ? 18 : 24
    for (let i = 0; i < count; i++) {
      const band = Math.floor(i / 8)
      const angle = ((i % 8) * Math.PI) / 4 + band * 0.4
      const radius = 1.35 + band * 0.65
      nodes.push(
        node(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.78,
          Math.sin(angle + band) * 0.75,
          0.07 + (i % 4 === 0 ? 0.025 : 0),
          i % 7 === 0 ? 1 : 0
        )
      )
      const index = nodes.length - 1
      edges.push([index, 0])
      if (i % 8 !== 0) edges.push([index - 1, index])
      if (i % 8 === 7) edges.push([index, index - 7])
    }
  } else if (chapter === 7) {
    coreScale = 0
    nodes.push(
      node(-2.15, -0.65, 0.25, 0.16),
      node(0, 0.1, -0.1, 0.2, 1),
      node(2.15, 0.9, 0.15, 0.16)
    )
    edges.push([0, 1], [1, 2])
  } else {
    coreScale = 0.18
    nodes.push(node(0, 0, 0, 0.075, 1))
  }

  while (nodes.length < NODE_COUNT) nodes.push(node(0, 0, 0, 0))
  return { nodes, edges, core, coreScale }
}

function subscribeMobile(onChange: () => void) {
  const query = window.matchMedia("(max-width: 767px)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function mobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange)
  return () => document.removeEventListener("visibilitychange", onChange)
}

function visibilitySnapshot() {
  return document.visibilityState === "visible"
}

function StaticNetwork({ chapter }: { chapter: number }) {
  const diagram = buildNetwork(chapter, true)
  const project = (position: Vector3) => [
    320 + position.x * 76,
    225 - position.y * 76,
  ]
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 640 450"
      fill="none"
      role="img"
      aria-label="Connected software systems represented by a network of nodes"
      style={{ color: `var(--primary, ${SCENE_PALETTES.dark.primary})` }}
    >
      <defs>
        <radialGradient id="engineering-static-core">
          <stop stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.025" />
        </radialGradient>
      </defs>
      {chapter === 0 && (
        <circle
          cx="320"
          cy="225"
          r="150"
          fill="url(#engineering-static-core)"
          stroke="currentColor"
          strokeOpacity="0.15"
        />
      )}
      {diagram.edges.map(([a, b], index) => {
        const start = project(diagram.nodes[a].position)
        const end = project(diagram.nodes[b].position)
        return (
          <path
            key={index}
            d={`M${start[0]} ${start[1]}L${end[0]} ${end[1]}`}
            stroke="currentColor"
            strokeOpacity="0.3"
          />
        )
      })}
      {diagram.nodes
        .filter((point) => point.radius > 0)
        .map((point, index) => {
          const [x, y] = project(point.position)
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={point.radius * 42 + 1}
              fill="currentColor"
              fillOpacity="0.8"
            />
          )
        })}
      {chapter === 2 &&
        [0, 1, 2].map((i) => (
          <rect
            key={i}
            x="340"
            y={210 + i * 24}
            width="90"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeOpacity="0.5"
            fill="currentColor"
            fillOpacity="0.08"
          />
        ))}
    </svg>
  )
}

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function StaticFallback({
  chapter,
  theme,
}: {
  chapter: number
  theme: "dark" | "light"
}) {
  if (theme === "light") return <StaticNetwork chapter={chapter} />
  return (
    <div
      className="world-fallback"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Image
        src="/images/engineering-core.png"
        alt="A graphite engineering core surrounded by luminous blue nodes and connected orbital paths"
        fill
        sizes="(max-width: 767px) 100vw, 58vw"
        preload
        style={{ objectFit: "contain", mixBlendMode: "screen" }}
      />
    </div>
  )
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    const canvas = gl.domElement
    const lost = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    canvas.addEventListener("webglcontextlost", lost)
    return () => canvas.removeEventListener("webglcontextlost", lost)
  }, [gl, onFailure])
  return null
}

function createResources(mobile: boolean, palette: ScenePalette) {
  const sphere = new SphereGeometry(1, mobile ? 6 : 10, mobile ? 5 : 7)
  const glowSphere = new SphereGeometry(1, mobile ? 4 : 6, mobile ? 4 : 5)
  const core = new SphereGeometry(1.57, mobile ? 20 : 32, mobile ? 12 : 20)
  const shell = new SphereGeometry(1.97, mobile ? 20 : 32, mobile ? 12 : 20)
  const polyhedron = new IcosahedronGeometry(1.62, 1)
  const structure = new EdgesGeometry(polyhedron)
  polyhedron.dispose()
  const box = new BoxGeometry(1, 1, 1)
  const boxEdges = new EdgesGeometry(box)
  const links = new BufferGeometry()
  const linkPositions = new BufferAttribute(new Float32Array(EDGE_COUNT * 6), 3)
  const linkColors = new BufferAttribute(
    new Float32Array(EDGE_COUNT * 6).fill(1),
    3
  )
  linkPositions.setUsage(DynamicDrawUsage)
  linkColors.setUsage(DynamicDrawUsage)
  links.setAttribute("position", linkPositions)
  links.setAttribute("color", linkColors)
  const arc = new BufferGeometry()
  const arcPoints: Vector3[] = []
  const segments = mobile ? 56 : 96
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 1.9
    arcPoints.push(new Vector3(Math.cos(angle), Math.sin(angle), 0))
  }
  arc.setFromPoints(arcPoints)
  const stars = new BufferGeometry()
  const starPositions = new Float32Array((mobile ? 32 : 82) * 3)
  for (let i = 0; i < starPositions.length / 3; i++) {
    const angle = i * 2.399963
    const radius = 3.0 + (i % 13) * 0.27
    starPositions[i * 3] = Math.cos(angle) * radius
    starPositions[i * 3 + 1] = Math.sin(angle) * radius * 0.8
    starPositions[i * 3 + 2] = -1.7 - (i % 7) * 0.46
  }
  stars.setAttribute("position", new BufferAttribute(starPositions, 3))
  const nodeMaterial = new MeshStandardMaterial({
    color: palette.node,
    emissive: palette.primary,
    emissiveIntensity: 1.25,
    metalness: 0.35,
    roughness: 0.23,
  })
  const glowMaterial = new MeshBasicMaterial({
    color: palette.primary,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const coreMaterial = new MeshPhysicalMaterial({
    color: palette.core,
    metalness: 0.3,
    roughness: 0.3,
    clearcoat: 0.8,
    clearcoatRoughness: 0.25,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
  })
  const shellMaterial = new ShaderMaterial({
    uniforms: {
      glowColor: { value: new Color(palette.rim) },
      strength: { value: 0.22 },
    },
    vertexShader:
      "varying vec3 viewNormal; varying vec3 viewPosition; void main() { vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); viewNormal = normalize(normalMatrix * normal); viewPosition = normalize(-mvPosition.xyz); gl_Position = projectionMatrix * mvPosition; }",
    fragmentShader:
      "uniform vec3 glowColor; uniform float strength; varying vec3 viewNormal; varying vec3 viewPosition; void main() { float rim = pow(1.0 - abs(dot(normalize(viewNormal), normalize(viewPosition))), 2.3); gl_FragColor = vec4(glowColor, rim * strength); }",
    transparent: true,
    depthWrite: false,
  })
  const linkMaterial = new LineBasicMaterial({
    color: palette.connection,
    vertexColors: true,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  })
  const structureMaterial = new LineBasicMaterial({
    color: palette.primary,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  })
  const arcMaterials = Array.from(
    { length: 4 },
    () =>
      new LineBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
  )
  const storageMaterial = new MeshStandardMaterial({
    color: palette.surface,
    metalness: 0.6,
    roughness: 0.3,
  })
  const storageEdgesMaterial = new LineBasicMaterial({
    color: palette.primary,
    transparent: true,
    opacity: 0.55,
  })
  const pulseMaterial = new MeshBasicMaterial({ color: palette.foreground })
  const fileMaterial = new MeshStandardMaterial({
    color: palette.file,
    emissive: palette.fileEmission,
    emissiveIntensity: 0.55,
    metalness: 0.2,
    roughness: 0.25,
  })
  const starMaterial = new PointsMaterial({
    color: palette.secondary,
    size: mobile ? 0.016 : 0.012,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  })
  return {
    sphere,
    glowSphere,
    core,
    shell,
    structure,
    box,
    boxEdges,
    links,
    linkPositions,
    linkColors,
    arc,
    stars,
    nodeMaterial,
    glowMaterial,
    coreMaterial,
    shellMaterial,
    linkMaterial,
    structureMaterial,
    arcMaterials,
    storageMaterial,
    storageEdgesMaterial,
    pulseMaterial,
    fileMaterial,
    starMaterial,
  }
}

function EngineeringScene({
  chapter,
  progress,
  reducedMotion,
  paused,
  theme,
  selectedTechnology,
  mobile,
  journeyMode,
  journeyProgress,
  projectStep,
}: EngineeringWorldProps & { mobile: boolean }) {
  const [initialTheme] = useState(theme)
  const palette = SCENE_PALETTES[theme]
  const resources = useMemo(
    () => createResources(mobile, SCENE_PALETTES[initialTheme]),
    [mobile, initialTheme]
  )
  const resourcesRef = useRef(resources)
  const horizontal =
    journeyMode === "horizontal" && chapter >= 1 && chapter <= 4
  const layout = useMemo(
    () => buildNetwork(chapter, mobile, horizontal),
    [chapter, mobile, horizontal]
  )
  const group = useRef<Group>(null)
  const nodes = useRef<InstancedMesh>(null)
  const halos = useRef<InstancedMesh>(null)
  const pulses = useRef<InstancedMesh>(null)
  const core = useRef<Group>(null)
  const rings = useRef<(Group | null)[]>([])
  const storage = useRef<Group>(null)
  const venues = useRef<Group>(null)
  const file = useRef<Group>(null)
  const positions = useRef(
    Array.from({ length: NODE_COUNT }, () => ({
      position: new Vector3(),
      radius: 0,
    }))
  )
  const dummy = useMemo(() => new Object3D(), [])
  const point = useMemo(() => new Vector3(), [])
  const cameraTarget = useMemo(() => new Vector3(), [])
  const cameraLookAt = useMemo(() => new Vector3(), [])
  const focusStart = useMemo(() => new Vector3(), [])
  const focusEnd = useMemo(() => new Vector3(), [])
  const color = useMemo(() => new Color(), [])
  const elapsed = useRef(0)
  const introduction = useRef({ elapsed: 0, complete: false })
  const initialized = useRef(false)
  const invalidate = useThree((state) => state.invalidate)
  const isStatic = reducedMotion || paused
  const technologyIndex = selectedTechnology
    ? TECHNOLOGIES.findIndex(
        (technology) =>
          technology.toLowerCase() === selectedTechnology.toLowerCase()
      )
    : -1
  const visibleNodeCount = layout.nodes.filter(
    (target) => target.radius > 0
  ).length
  const selection =
    technologyIndex >= 0 && visibleNodeCount > 1
      ? (technologyIndex % (visibleNodeCount - 1)) + 1
      : -1

  useEffect(() => {
    resourcesRef.current = resources
  }, [resources])

  useEffect(() => {
    const resources = resourcesRef.current
    const light = theme === "light"
    resources.coreMaterial.color.set(palette.core)
    resources.coreMaterial.opacity = light ? 0.62 : 0.48
    resources.nodeMaterial.color.set(palette.node)
    resources.nodeMaterial.emissive.set(palette.primary)
    resources.nodeMaterial.emissiveIntensity = light ? 0.35 : 1.25
    resources.glowMaterial.color.set(palette.primary)
    resources.glowMaterial.opacity = light ? 0.035 : 0.075
    resources.linkMaterial.color.set(palette.connection)
    resources.linkMaterial.opacity = light ? 0.32 : 0.28
    resources.structureMaterial.color.set(palette.primary)
    resources.storageMaterial.color.set(palette.surface)
    resources.storageEdgesMaterial.color.set(palette.primary)
    resources.pulseMaterial.color.set(
      light ? palette.primary : palette.foreground
    )
    resources.fileMaterial.color.set(palette.file)
    resources.fileMaterial.emissive.set(palette.fileEmission)
    resources.starMaterial.color.set(palette.secondary)
    resources.starMaterial.opacity = light ? 0.26 : 0.45
    resources.shellMaterial.uniforms.glowColor.value.set(palette.rim)
    resources.shellMaterial.uniforms.strength.value = light ? 0.16 : 0.22
    resources.arcMaterials.forEach((material) =>
      material.color.set(palette.primary)
    )
    invalidate()
  }, [theme, palette, resources, invalidate])

  useEffect(() => {
    invalidate()
  }, [
    chapter,
    progress,
    isStatic,
    selectedTechnology,
    projectStep,
    horizontal,
    invalidate,
  ])

  useEffect(
    () => () => {
      Object.values(resources).forEach((resource) => {
        if (Array.isArray(resource))
          resource.forEach((material) => material.dispose())
        else if (
          "dispose" in resource &&
          typeof resource.dispose === "function"
        )
          resource.dispose()
      })
    },
    [resources]
  )

  useFrame((state, rawDelta) => {
    const resources = resourcesRef.current
    const current = positions.current
    if (
      !group.current ||
      !nodes.current ||
      !halos.current ||
      !core.current ||
      !pulses.current
    )
      return
    const delta = Math.min(rawDelta, 0.05)
    if (!isStatic) elapsed.current += delta
    const time = elapsed.current
    const alpha =
      isStatic || !initialized.current ? 1 : 1 - Math.exp(-delta * 4.5)
    const motion = isStatic ? 0 : 1
    const highlighted = chapter === 6 && selection > 0
    const storyProgress = horizontal
      ? MathUtils.clamp(
          isStatic && projectStep !== undefined
            ? projectStep / 5
            : (journeyProgress?.current ?? (projectStep ?? 0) / 5),
          0,
          1
        )
      : 0
    const storyPosition = storyProgress * 5
    const stage = Math.floor(storyPosition)
    const nextStage = Math.min(5, stage + 1)
    const stageBlend = storyPosition - stage
    const nodeStages = PROJECT_STAGE_NODES[chapter - 1]
    const edgeStages = PROJECT_STAGE_EDGES[chapter - 1]
    if (isStatic || chapter !== 0) introduction.current.complete = true
    if (!introduction.current.complete) {
      introduction.current.elapsed = Math.min(
        1.4,
        introduction.current.elapsed + delta
      )
      introduction.current.complete = introduction.current.elapsed >= 1.4
    }
    const introProgress = introduction.current.complete
      ? 1
      : introduction.current.elapsed / 1.4
    const reveal = MathUtils.smoothstep(introProgress, 0, 1)
    const expansion = 0.05 + reveal * 0.95
    const geometryAlpha = reveal < 1 ? 1 : alpha

    layout.nodes.forEach((target, i) => {
      const selected = highlighted && i === selection
      const focus = horizontal
        ? MathUtils.lerp(
            stageWeight(nodeStages, stage, i),
            stageWeight(nodeStages, nextStage, i),
            stageBlend
          )
        : 1
      const focusRadius = horizontal ? 0.72 + focus * 0.48 : 1
      point.copy(target.position).multiplyScalar(expansion)
      current[i].position.lerp(point, geometryAlpha)
      const birth = MathUtils.smoothstep(
        introProgress,
        i === 0 ? 0 : 0.15 + (i / NODE_COUNT) * 0.16,
        0.7 + (i / NODE_COUNT) * 0.22
      )
      const seed = i === 0 ? 0.075 * (1 - reveal) : 0
      current[i].radius = MathUtils.lerp(
        current[i].radius,
        target.radius * (selected ? 1.8 : 1) * focusRadius * birth + seed,
        geometryAlpha
      )
      dummy.position.copy(current[i].position)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.setScalar(current[i].radius)
      dummy.updateMatrix()
      nodes.current!.setMatrixAt(i, dummy.matrix)
      color.set(target.tone === 1 ? palette.file : palette.primary)
      if (horizontal) color.multiplyScalar(0.22 + focus * 0.78)
      if (highlighted && !selected) color.multiplyScalar(0.48)
      if (selected)
        color.set(theme === "light" ? palette.primary : palette.foreground)
      nodes.current!.setColorAt(i, color)
      dummy.scale.setScalar(
        current[i].radius *
          (selected ? 4.5 : horizontal ? 1.7 + focus * 1.3 : 2.5)
      )
      dummy.updateMatrix()
      halos.current!.setMatrixAt(i, dummy.matrix)
    })
    nodes.current.instanceMatrix.needsUpdate = true
    if (nodes.current.instanceColor)
      nodes.current.instanceColor.needsUpdate = true
    halos.current.instanceMatrix.needsUpdate = true
    nodes.current.count = visibleNodeCount
    halos.current.count = visibleNodeCount

    for (let i = 0; i < EDGE_COUNT; i++) {
      const edge = layout.edges[i]
      const a = edge ? current[edge[0]].position : point.set(0, 0, 0)
      const b = edge ? current[edge[1]].position : a
      resources.linkPositions.setXYZ(i * 2, a.x, a.y, a.z)
      resources.linkPositions.setXYZ(i * 2 + 1, b.x, b.y, b.z)
      const focus =
        horizontal && edge
          ? MathUtils.lerp(
              stageWeight(edgeStages, stage, i),
              stageWeight(edgeStages, nextStage, i),
              stageBlend
            )
          : 1
      const brightness = horizontal ? 0.08 + focus * 0.92 : 1
      resources.linkColors.setXYZ(i * 2, brightness, brightness, brightness)
      resources.linkColors.setXYZ(i * 2 + 1, brightness, brightness, brightness)
    }
    resources.linkPositions.needsUpdate = true
    resources.linkColors.needsUpdate = true
    resources.linkMaterial.opacity = (theme === "light" ? 0.32 : 0.28) * reveal
    resources.starMaterial.opacity = (theme === "light" ? 0.26 : 0.45) * reveal
    const coreFocus = horizontal
      ? MathUtils.lerp(
          stageWeight(nodeStages, stage, 0),
          stageWeight(nodeStages, nextStage, 0),
          stageBlend
        )
      : 1
    resources.coreMaterial.opacity =
      (theme === "light" ? 0.62 : 0.48) *
      (horizontal ? 0.35 + coreFocus * 0.65 : 1)

    core.current.position.lerp(layout.core, alpha)
    const coreScale = MathUtils.lerp(
      core.current.scale.x,
      layout.coreScale * expansion,
      geometryAlpha
    )
    core.current.scale.setScalar(coreScale)
    core.current.visible = coreScale > 0.001
    core.current.rotation.y = time * 0.035 * motion
    resources.structureMaterial.opacity =
      chapter === 0 ? (theme === "light" ? 0.18 : 0.15) : 0.32

    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      chapter === 0 || chapter === 6 ? -0.08 : 0.08,
      alpha
    )
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      chapter === 0
        ? Math.sin(time * 0.045) * 0.2 * motion + progress * 0.22
        : chapter === 6
          ? -0.15 + progress * 0.16
          : -0.04,
      alpha
    )
    group.current.rotation.z = MathUtils.lerp(
      group.current.rotation.z,
      chapter === 0 ? -0.09 : 0.015,
      alpha
    )

    rings.current.forEach((ring, i) => {
      if (!ring) return
      let radius =
        chapter === 0
          ? [2.5, 2.72, 2.16, 2.16][i]
          : chapter === 1
            ? 0.85 + i * 0.1
            : chapter === 2
              ? 0.52
              : chapter === 6
                ? 1.35 + i * 0.48
                : chapter === 7
                  ? 0.45
                  : chapter === 8
                    ? 0.8 + i * 0.32
                    : 0.4
      if (chapter === 7 && i === 3) radius = 0
      ring.scale.setScalar(
        MathUtils.lerp(ring.scale.x, radius * expansion, geometryAlpha)
      )
      const center =
        chapter === 7
          ? layout.nodes[i % 3].position
          : chapter === 2
            ? layout.nodes[3].position
            : layout.core
      ring.position.lerp(center, alpha)
      const opacity =
        chapter === 0
          ? [0.34, 0.16, 0.13, 0.12][i]
          : chapter === 1
            ? 0.2
            : chapter === 2
              ? i === 0
                ? 0.4
                : 0
              : chapter === 6
                ? 0.19
                : chapter === 7
                  ? 0.3
                  : chapter === 8
                    ? i < 2
                      ? 0.22
                      : 0
                    : 0
      resources.arcMaterials[i].opacity = MathUtils.lerp(
        resources.arcMaterials[i].opacity,
        opacity * reveal,
        geometryAlpha
      )
      ring.visible = resources.arcMaterials[i].opacity > 0.001
      const tilt =
        chapter === 0 || chapter === 6
          ? [
              [0.7, 0.35, 0.35],
              [-0.7, 0.6, -0.4],
              [1.35, 0.2, 0.12],
              [0.1, 1.38, 0.15],
            ][i]
          : [
              [0.15, 0.3, 0.12],
              [0.9, 0.1, 0],
              [0.1, 1.2, 0],
              [0.7, 0.5, 0],
            ][i]
      ring.rotation.set(
        tilt[0],
        tilt[1],
        tilt[2] + time * 0.018 * (i % 2 ? -1 : 1) * motion
      )
    })

    if (storage.current) {
      const size = MathUtils.lerp(
        storage.current.scale.x,
        chapter === 2 ? 1 : 0,
        alpha
      )
      storage.current.scale.setScalar(size)
      storage.current.visible = size > 0.001
    }
    if (venues.current) {
      const size = MathUtils.lerp(
        venues.current.scale.x,
        chapter === 3 ? 1 : 0,
        alpha
      )
      venues.current.scale.setScalar(size)
      venues.current.visible = size > 0.001
    }

    for (let i = 0; i < 8; i++) {
      const focusedEdges =
        horizontal && stage > 0 ? edgeStages[stage] : undefined
      const edgeIndex = focusedEdges?.length
        ? focusedEdges[i % focusedEdges.length]
        : chapter === 1
          ? i < 4
            ? i * 3 + 2
            : 12
          : chapter === 3
            ? i % 8
            : chapter === 4
              ? Math.floor((time * 0.6 + i * 1.8) % 12)
              : i % Math.max(1, layout.edges.length)
      const edge = layout.edges[edgeIndex]
      const enabled =
        chapter >= 1 &&
        chapter <= 5 &&
        (chapter !== 2 || (horizontal && stage >= 3)) &&
        edge
      if (enabled && edge) {
        const t = isStatic
          ? 0.45
          : (time * (chapter === 4 ? 0.33 : 0.24) + i * 0.19) % 1
        dummy.position
          .copy(current[edge[0]].position)
          .lerp(current[edge[1]].position, t)
        dummy.scale.setScalar(0.03 + (i % 2) * 0.008)
      } else {
        dummy.position.set(0, 0, 0)
        dummy.scale.setScalar(0)
      }
      dummy.updateMatrix()
      pulses.current.setMatrixAt(i, dummy.matrix)
    }
    pulses.current.instanceMatrix.needsUpdate = true
    pulses.current.count =
      chapter >= 1 && chapter <= 5 && chapter !== 2
        ? 8
        : horizontal && chapter === 2 && stage >= 3
          ? 4
          : 0

    if (file.current) {
      const phase = isStatic ? 0.3 : (time % 8) / 8
      const travel = horizontal
        ? MathUtils.smoothstep(storyPosition, 1, 2)
        : Math.min(1, phase / 0.38)
      file.current.position
        .copy(layout.nodes[0].position)
        .lerp(layout.nodes[1].position, travel)
      file.current.position.z += 0.22
      const ttl = horizontal
        ? 1 - MathUtils.smoothstep(storyPosition, 4.25, 5)
        : phase > 0.72
          ? Math.max(0, 1 - (phase - 0.72) / 0.1)
          : 1
      file.current.scale.setScalar(chapter === 2 ? ttl : 0)
      file.current.visible = chapter === 2 && ttl > 0.001
      file.current.rotation.set(0.14, -0.28, phase * 0.4)
    }

    const aspect = state.size.width / Math.max(1, state.size.height)
    const distance =
      (chapter === 8 ? 9.1 : chapter === 6 ? 10.25 : 9.7) *
      Math.max(1, 1.03 / aspect)
    cameraTarget.set(
      0.08,
      chapter === 0 ? 0.08 : 0,
      distance - Math.min(1, Math.max(0, progress)) * (isStatic ? 0 : 0.2)
    )
    if (horizontal) {
      stageCenter(layout, nodeStages, stage, focusStart)
      stageCenter(layout, nodeStages, nextStage, focusEnd)
      point.copy(focusStart).lerp(focusEnd, stageBlend).multiplyScalar(0.26)
      cameraTarget.set(
        0.08 + point.x,
        point.y * 0.35,
        distance - storyProgress * 0.35
      )
      cameraLookAt.lerp(point, alpha)
    } else cameraLookAt.set(0, 0, 0)
    state.camera.position.lerp(cameraTarget, alpha)
    state.camera.lookAt(cameraLookAt)
    if (state.scene.fog && "near" in state.scene.fog) {
      state.scene.fog.near = distance + 1
      state.scene.fog.far = distance + 14
    }
    initialized.current = true
  })

  return (
    <>
      <fog attach="fog" args={[palette.background, 10, 22]} />
      <ambientLight intensity={theme === "light" ? 1.3 : 0.75} />
      <directionalLight
        position={[-3, 5, 6]}
        color={palette.keyLight}
        intensity={theme === "light" ? 3.2 : 3.6}
      />
      <directionalLight
        position={[4, -2, 2]}
        color={palette.fillLight}
        intensity={theme === "light" ? 1.1 : 1.9}
      />
      <pointLight
        position={[0, 1, -3]}
        color={palette.primary}
        intensity={theme === "light" ? 3 : 6}
        distance={12}
        decay={2}
      />
      <group ref={group} name="engineering-world" dispose={null}>
        <group ref={core} name="identity-core">
          <mesh geometry={resources.core} material={resources.coreMaterial} />
          <mesh geometry={resources.shell} material={resources.shellMaterial} />
          <lineSegments
            geometry={resources.structure}
            material={resources.structureMaterial}
          />
        </group>
        <instancedMesh
          ref={nodes}
          args={[resources.sphere, resources.nodeMaterial, NODE_COUNT]}
          frustumCulled={false}
          name="network-nodes"
        />
        <instancedMesh
          ref={halos}
          args={[resources.glowSphere, resources.glowMaterial, NODE_COUNT]}
          frustumCulled={false}
          name="node-halos"
        />
        <lineSegments
          geometry={resources.links}
          material={resources.linkMaterial}
          frustumCulled={false}
          name="system-connections"
        />
        {resources.arcMaterials.map((material, i) => (
          <group
            key={i}
            ref={(element) => {
              rings.current[i] = element
            }}
            name={`orbital-arc-${i}`}
          >
            <lineLoop geometry={resources.arc} material={material} />
          </group>
        ))}
        <group
          ref={storage}
          name="ephemeral-vault"
          scale={0}
          position={[0.85, -0.2, 0]}
        >
          {[0, 1, 2].map((i) => (
            <group key={i} position={[0, 0.5 - i * 0.5, 0]}>
              <mesh
                geometry={resources.box}
                material={resources.storageMaterial}
                scale={[1.28, 0.33, 0.9]}
              />
              <lineSegments
                geometry={resources.boxEdges}
                material={resources.storageEdgesMaterial}
                scale={[1.285, 0.335, 0.905]}
              />
              <mesh
                geometry={resources.box}
                material={resources.pulseMaterial}
                position={[-0.4, 0, 0.457]}
                scale={[0.09, 0.028, 0.012]}
              />
              <mesh
                geometry={resources.box}
                material={resources.pulseMaterial}
                position={[0.1, 0, 0.457]}
                scale={[0.6, 0.015, 0.012]}
              />
            </group>
          ))}
        </group>
        <group ref={venues} name="event-network" scale={0}>
          {[
            [-1.3, 1.3, -0.3],
            [0.3, 0.65, 0.45],
            [1.4, -1.6, -0.3],
            [-0.2, -1.95, 0.3],
          ].map((position, i) => (
            <group
              key={i}
              position={position as [number, number, number]}
              rotation={[0, 0.2 + i * 0.15, 0]}
            >
              <mesh
                geometry={resources.box}
                material={resources.storageMaterial}
                scale={[0.4, 0.42, 0.4]}
              />
              <lineSegments
                geometry={resources.boxEdges}
                material={resources.storageEdgesMaterial}
                scale={[0.405, 0.425, 0.405]}
              />
            </group>
          ))}
        </group>
        <group ref={file} scale={0} name="temporary-file">
          <mesh
            geometry={resources.box}
            material={resources.fileMaterial}
            scale={[0.2, 0.27, 0.045]}
          />
        </group>
        <instancedMesh
          ref={pulses}
          args={[resources.sphere, resources.pulseMaterial, 8]}
          frustumCulled={false}
          name="architecture-signals"
        />
        <points
          geometry={resources.stars}
          material={resources.starMaterial}
          name="ambient-particles"
        />
      </group>
    </>
  )
}

export default function EngineeringWorld(props: EngineeringWorldProps) {
  const container = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [failed, setFailed] = useState(false)
  const mobile = useSyncExternalStore(
    subscribeMobile,
    mobileSnapshot,
    () => false
  )
  const visible = useSyncExternalStore(
    subscribeVisibility,
    visibilitySnapshot,
    () => true
  )
  const onFailure = useCallback(() => setFailed(true), [])
  const chapter = MathUtils.clamp(Math.round(props.chapter), 0, 8)
  const active = !props.reducedMotion && !props.paused && inView && visible

  useEffect(() => {
    const element = container.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const fallback = <StaticFallback chapter={chapter} theme={props.theme} />
  return (
    <div
      ref={container}
      className="world-renderer"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {failed ? (
        fallback
      ) : (
        <SceneBoundary fallback={fallback}>
          <Canvas
            dpr={mobile ? 1 : [1, 1.5]}
            camera={{
              position: [0.08, 0.08, 9.7],
              fov: 38,
              near: 0.1,
              far: 35,
            }}
            gl={{
              alpha: true,
              antialias: !mobile,
              powerPreference: "low-power",
              stencil: false,
            }}
            frameloop={active ? "always" : "demand"}
            fallback={fallback}
            onCreated={({ gl }) => {
              gl.domElement.setAttribute("aria-hidden", "true")
            }}
            style={{ pointerEvents: "none" }}
          >
            <ContextGuard onFailure={onFailure} />
            <EngineeringScene
              {...props}
              chapter={chapter}
              mobile={mobile}
              paused={props.paused || !inView || !visible}
            />
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  )
}
