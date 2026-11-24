// Agentcraft voxel island: a floating sage island with pines, a cabin, a lantern, a voxel Wren
// and 24 "file" cubes that arrange themselves into what the visitor asked for.
// Extras for round 4: time of day, a "look" scan, plan ghosts, camera focus and screen anchors
// so the page can pin HTML labels to points in the scene.
import {
  Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshStandardMaterial, InstancedMesh,
  Object3D, Color, HemisphereLight, DirectionalLight, Group, PCFShadowMap, Raycaster, Vector2, Vector3, Mesh,
  MeshBasicMaterial, PointLight, EdgesGeometry, LineSegments, LineBasicMaterial, BufferGeometry, Float32BufferAttribute
} from 'three';

const N = 30, C = N / 2;
const PAL = {
  grass: '#84a98c', grass2: '#7ba184', grassHi: '#52796f', edge: '#6e9478',
  earth: '#7d8a74', earth2: '#6f7c68', rock: '#56696b', rock2: '#3d4f56', deep: '#2f3e46',
  pine: '#354f52', pine2: '#2f3e46', trunk: '#4a3b2a', wall: '#fafbf9', roof: '#2f3e46', win: '#cad2c5', door: '#354f52',
  cloud: '#fafbf9', tray: '#cad2c5',
  doc: '#2f3e46', img: '#84a98c', ins: '#52796f', oth: '#cad2c5'
};
const WREN = ['....hhhh....','...hhhhhh...','.hhhhbbhhhh.','...ssssss...','...sesses...','...ssssss...','....smms....','...cccccc...','..cccgccc...','.sccccgcccs.','.s.cccgcc.s.','...ppgggp...','...pp..pp...','...pp..pp...','..kkk..kkk..'];
const WC = { h: '#354f52', b: '#cad2c5', s: '#d9a47f', e: '#1f2a24', m: '#a0523d', c: '#84a98c', g: '#8a6a3a', p: '#1f2a24', k: '#4a3b2a' };
const TYPES = [...Array(6).fill('doc'), ...Array(8).fill('img'), ...Array(4).fill('ins'), ...Array(6).fill('oth')];

// Light presets. Sage Slate only: cool greens and greys, a dusty rose dusk, a blue-grey night.
const TIMES = {
  morning: { sky: '#eef2f3', ground: '#6b7d73', hi: 1.75, sun: '#fbf3e4', si: 2.1, sp: [-30, 20, 22], glow: 0, star: 0 },
  day:     { sky: '#f4f7f2', ground: '#56696b', hi: 1.9,  sun: '#ffffff', si: 2.4, sp: [18, 34, 14], glow: 0, star: 0 },
  dusk:    { sky: '#eadcdc', ground: '#3d4f56', hi: 1.25, sun: '#f1cdb8', si: 1.9, sp: [30, 12, 20], glow: .55, star: .25 },
  night:   { sky: '#8aa0b3', ground: '#2a3940', hi: 1.05,  sun: '#c4d6ea', si: .75, sp: [-14, 30, 12], glow: 1, star: 1 }
};

const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function heightAt(x, z) {
  const flat = (x >= 9 && z >= 9);
  const hill = Math.round(4.2 * Math.exp(-((x - 5) ** 2 + (z - 6) ** 2) / 16)) + Math.round(2.6 * Math.exp(-((x - 7) ** 2 + (z - 23) ** 2) / 10)) + Math.round(2.2 * Math.exp(-((x - 24) ** 2 + (z - 5) ** 2) / 9));
  return 3 + (flat ? 0 : hill);
}
function exists(x, z) {
  const d = Math.hypot(x - C + .5, z - C + .5) / C;
  const e = .1 * Math.sin(x * .9 + z * .4) + .07 * Math.cos(z * 1.3 - x * .2);
  return d < .93 + e;
}

export function mount(canvas, opts = {}) {
  let calm = !!opts.calm;
  const lite = !!opts.lite;
  const onRender = opts.onRender || null;
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.shadowMap.enabled = !lite;
  renderer.shadowMap.type = PCFShadowMap;
  const scene = new Scene();
  const camera = new PerspectiveCamera(24, 1, .1, 400);
  const HOME = new Vector3(0, -1.5, 0);
  const DIR = new Vector3(46, 49.5, 54);
  const DIST = DIR.length();
  DIR.normalize();
  const RIGHT = new Vector3().crossVectors(DIR, new Vector3(0, 1, 0)).normalize();
  const UPV = new Vector3().crossVectors(RIGHT, DIR).normalize();
  camera.position.copy(HOME).addScaledVector(DIR, DIST);
  camera.lookAt(HOME);

  const hemi = new HemisphereLight('#f4f7f2', '#56696b', 1.9);
  scene.add(hemi);
  const sun = new DirectionalLight('#ffffff', 2.4);
  sun.position.set(18, 34, 14);
  sun.castShadow = !lite;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 90 });
  sun.shadow.bias = -.0006;
  scene.add(sun);

  const world = new Group();
  scene.add(world);
  const box = new BoxGeometry(1, 1, 1);
  const mat = new MeshStandardMaterial({ roughness: .95, metalness: 0, flatShading: true });
  const o = new Object3D(), col = new Color();

  // ---- static voxels (terrain, pines, cabin, lantern post) ----
  const vox = new Map();
  const put = (x, y, z, c) => vox.set(`${x},${y},${z}`, [x, y, z, c]);
  for (let x = 0; x < N; x++) for (let z = 0; z < N; z++) {
    if (!exists(x, z)) continue;
    const H = heightAt(x, z);
    const d = Math.hypot(x - C + .5, z - C + .5) / C;
    const depth = Math.round(1 + Math.pow(Math.max(0, 1 - d), 1.4) * 11 + 1.2 * Math.sin(x * 1.7 + z * 2.1));
    for (let y = -depth; y <= H; y++) {
      let c;
      if (y === H) c = H >= 5 ? PAL.grassHi : ((x * 3 + z) % 4 === 0 ? PAL.grass2 : PAL.grass);
      else if (y === H - 1) c = PAL.edge;
      else if (y >= 0) c = y % 2 ? PAL.earth : PAL.earth2;
      else if (y > -3) c = PAL.rock;
      else c = (x + z + y) % 3 ? PAL.rock2 : PAL.deep;
      put(x, y, z, c);
    }
  }
  const top = (x, z) => heightAt(x, z) + 1;
  [[4, 10], [3, 15], [8, 3], [13, 3], [3, 20], [6, 24], [17, 2], [9, 7], [6, 13], [12, 9], [24, 3], [26, 9], [10, 14], [22, 2]].forEach(([x, z], i) => {
    if (!exists(x, z)) return;
    const y0 = top(x, z), h = 1 + (i % 2);
    for (let y = 0; y < h; y++) put(x, y0 + y, z, PAL.trunk);
    const layers = i % 3 === 0 ? [1, 1, 1, 0, 0] : [1, 1, 0, 0];
    layers.forEach((r, j) => { for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) put(x + dx, y0 + h + j, z + dz, (j + dx + dz) % 2 ? PAL.pine : PAL.pine2); });
  });
  const BX = 18, BZ = 6, by0 = top(BX, BZ);
  for (let x = BX; x < BX + 5; x++) for (let z = BZ; z < BZ + 4; z++) for (let y = by0; y < by0 + 3; y++) {
    const edge = x === BX || x === BX + 4 || z === BZ || z === BZ + 3;
    if (!edge) continue;
    let c = PAL.wall;
    if (z === BZ + 3 && x === BX + 2 && y < by0 + 2) c = PAL.door;
    if (z === BZ + 3 && (x === BX + 1 || x === BX + 3) && y === by0 + 1) c = PAL.win;
    if (x === BX + 4 && z === BZ + 1 && y === by0 + 1) c = PAL.win;
    put(x, y, z, c);
  }
  for (let k = 0; k < 3; k++) for (let x = BX - 1 + k; x <= BX + 5 - k; x++) for (let z = BZ - 1; z <= BZ + 4; z++) put(x, by0 + 3 + k, z, PAL.roof);
  put(BX + 4, by0 + 5, BZ + 1, PAL.roof); put(BX + 4, by0 + 6, BZ + 1, PAL.roof);
  const LX = 10, LZ = 23, ly0 = top(LX, LZ);
  for (let y = 0; y < 3; y++) put(LX, ly0 + y, LZ, PAL.trunk);

  const list = [...vox.values()].filter(([x, y, z]) => [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].some(([a, b, c]) => !vox.has(`${x + a},${y + b},${z + c}`)));
  const terrain = new InstancedMesh(box, mat, list.length);
  list.forEach(([x, y, z, c], i) => { o.position.set(x - C + .5, y + .5, z - C + .5); o.updateMatrix(); terrain.setMatrixAt(i, o.matrix); terrain.setColorAt(i, col.set(c)); });
  terrain.castShadow = terrain.receiveShadow = true;
  world.add(terrain);

  // ---- lights that come on after dark: cabin windows, lantern, stars ----
  const glowMat = new MeshBasicMaterial({ color: '#eef3cf', transparent: true, opacity: 0 });
  { const wy = by0 + 1.5;
    [[BX + 1, wy, BZ + 4.03, 0], [BX + 3, wy, BZ + 4.03, 0], [BX + 5.03, wy, BZ + 1.5, 1]].forEach(([gx, y, gz, side]) => {
      const m = new Mesh(new BoxGeometry(side ? .06 : .8, .8, side ? .8 : .06), glowMat);
      m.position.set(side ? gx - C : gx - C + .5, y, side ? gz - C : gz - C);
      world.add(m);
    });
  }
  const lampMat = new MeshStandardMaterial({ color: '#cad2c5', emissive: '#eef3cf', emissiveIntensity: 0, roughness: .6 });
  const lamp = new Mesh(new BoxGeometry(.8, .8, .8), lampMat);
  lamp.position.set(LX - C + .5, ly0 + 3.4, LZ - C + .5); lamp.castShadow = true;
  const cap = new Mesh(new BoxGeometry(1.1, .22, 1.1), new MeshStandardMaterial({ color: PAL.roof, roughness: .9 }));
  cap.position.set(0, .5, 0); lamp.add(cap);
  world.add(lamp);
  const lampLight = new PointLight('#eef3cf', 0, 0, 2);
  lampLight.position.set(LX - C + .5, ly0 + 3.4, LZ - C + 1.6);
  world.add(lampLight);
  const starMat = new MeshBasicMaterial({ color: '#fafbf9', transparent: true, opacity: 0, depthWrite: false });
  const stars = new InstancedMesh(new BoxGeometry(.13, .13, .13), starMat, 80);
  for (let i = 0; i < 80; i++) {
    o.position.copy(HOME).addScaledVector(DIR, -40 - rnd(i + 7) * 20).addScaledVector(RIGHT, (rnd(i + 40) - .5) * 110).addScaledVector(UPV, 6 + rnd(i + 90) * 26);
    o.scale.setScalar(.7 + rnd(i + 3) * 1.1); o.updateMatrix(); stars.setMatrixAt(i, o.matrix);
  }
  o.scale.setScalar(1);
  stars.visible = false;
  scene.add(stars);

  // ---- clouds ----
  let cloudBase = .92;
  const clouds = new Group();
  const cloudMat = new MeshStandardMaterial({ color: PAL.cloud, roughness: 1, transparent: true, opacity: .92 });
  [[-20, 17, -10, 5], [8, 21, -22, 4], [22, 15, -4, 3]].forEach(([x, y, z, w], k) => {
    const g = new Group();
    const cells = [];
    for (let i = -w; i <= w; i++) for (let j = -1; j <= 1; j++) if (Math.abs(i) + Math.abs(j) * 2 <= w) cells.push([i, 0, j]);
    for (let i = -w + 2; i <= w - 2; i++) cells.push([i, 1, 0]);
    const m = new InstancedMesh(box, cloudMat.clone(), cells.length);
    cells.forEach(([a, b, c], i) => { o.position.set(a, b, c); o.updateMatrix(); m.setMatrixAt(i, o.matrix); });
    g.add(m); g.position.set(x, y, z); g.userData = { r: Math.hypot(x, z), a: Math.atan2(z, x), y, s: .02 + k * .008 };
    clouds.add(g);
  });
  scene.add(clouds);

  // ---- Wren ----
  const wren = new Group();
  const s = .3;
  const wcells = [];
  WREN.forEach((row, r) => [...row].forEach((ch, cIdx) => {
    if (ch === '.') return;
    const deep = ch === 'h' ? 2 : 1;
    for (let dz = -deep; dz <= deep; dz++) wcells.push([(cIdx - 5.5) * s, (WREN.length - 1 - r) * s + s / 2, dz * s, WC[ch]]);
  }));
  const wm = new InstancedMesh(new BoxGeometry(s, s, s), mat, wcells.length);
  wcells.forEach(([x, y, z, c], i) => { o.position.set(x, y, z); o.updateMatrix(); wm.setMatrixAt(i, o.matrix); wm.setColorAt(i, col.set(c)); });
  wm.castShadow = true;
  wren.add(wm);
  const wx = 13 - C + .5, wz = 19 - C + .5, wy = top(13, 19);
  wren.position.set(wx, wy, wz);
  wren.rotation.y = .55;
  world.add(wren);

  // ---- folder trays ----
  const trays = new Group();
  const trayX = [.6, 3.2, 5.8, 8.4];
  const trayZ = 8.6;
  const trayMats = [];
  trayX.forEach((x, i) => {
    const tm = new MeshStandardMaterial({ color: '#fafbf9', roughness: .9, transparent: true });
    const t = new Mesh(new BoxGeometry(2.3, .18, 2.3), tm);
    t.position.set(x, 4.09, trayZ); t.receiveShadow = t.castShadow = true;
    const bm = new MeshStandardMaterial({ color: PAL[['doc', 'img', 'ins', 'oth'][i]], roughness: .9, transparent: true });
    const tab = new Mesh(new BoxGeometry(.8, .18, .3), bm);
    tab.position.set(-.55, .14, -1.15); t.add(tab);
    trayMats.push(tm, bm);
    trays.add(t);
  });
  trays.visible = false; trays.scale.setScalar(.001);
  world.add(trays);
  const setTrayOpacity = (v) => trayMats.forEach(m => { m.opacity = v; m.depthWrite = v > .95; });

  // ---- file cubes ----
  const fs = .92;
  const files = new InstancedMesh(new BoxGeometry(fs, fs, fs), new MeshStandardMaterial({ roughness: .8, flatShading: true }), TYPES.length);
  files.castShadow = files.receiveShadow = true;
  const baseCol = TYPES.map(t => new Color(PAL[t]));
  TYPES.forEach((t, i) => files.setColorAt(i, baseCol[i]));
  world.add(files);
  const fy = 4 + fs / 2;
  const pile = TYPES.map((_, i) => {
    const layer = i < 18 ? 0 : 1;
    const a = i * 2.39996, r = layer ? .8 + (i - 18) * .45 : 1 + Math.sqrt(i) * .95;
    return { x: 4.2 + Math.cos(a) * r, y: fy + layer * fs * .98, z: 5.2 + Math.sin(a) * r * .8, ry: rnd(i + 9) * 1.4 - .7, rx: layer ? (rnd(i + 3) - .5) * .5 : 0 };
  });
  function targets(kind) {
    const byType = { doc: [], img: [], ins: [], oth: [] };
    TYPES.forEach((t, i) => byType[t].push(i));
    const T = [];
    if (kind === 'folder') {
      ['doc', 'img', 'ins', 'oth'].forEach((t, ti) => byType[t].forEach((i, k) => {
        T[i] = { x: trayX[ti] + ((k % 2) - .5) * .98, y: 4.18 + fs / 2 + Math.floor(k / 4) * fs * 1.02, z: trayZ + ((Math.floor(k / 2) % 2) - .5) * .98, ry: 0, rx: 0 };
      }));
    } else if (kind === 'sheet') {
      const h = [2, 4, 3, 6, 5, 4]; let i = 0;
      h.forEach((n, c) => { for (let k = 0; k < n; k++) T[i++] = { x: 1.6 + c * 1.1, y: fy + k * fs * 1.02, z: 7.4, ry: 0, rx: 0 }; });
    } else if (kind === 'page') {
      for (let i = 0; i < 24; i++) T[i] = { x: 1.6 + (i % 6) * .96, y: fy + Math.floor(i / 6) * .96, z: 6, ry: 0, rx: 0 };
    } else {
      const L = [9, 8, 7]; let i = 0;
      L.forEach((n, r) => { for (let k = 0; k < n; k++) T[i++] = { x: .6 + k * .98, y: fy, z: 5.4 + r * 1.3, ry: 0, rx: 0 }; });
    }
    return T;
  }

  // ---- plan ghosts: outlines of where every file will go ----
  const edgeBase = new EdgesGeometry(new BoxGeometry(fs, fs, fs)).attributes.position.array;
  const ghostGeo = new BufferGeometry();
  const ghostLines = new LineSegments(ghostGeo, new LineBasicMaterial({ color: '#fafbf9', transparent: true, opacity: 0 }));
  const ghostFill = new InstancedMesh(new BoxGeometry(fs * .98, fs * .98, fs * .98), new MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false, roughness: 1 }), TYPES.length);
  TYPES.forEach((t, i) => ghostFill.setColorAt(i, baseCol[i]));
  ghostLines.visible = ghostFill.visible = false;
  world.add(ghostLines, ghostFill);
  let ghostKind = null, ghostK = 0, ghostTo = 0;
  function setGhosts(kind) {
    if (kind) {
      const T = targets(kind);
      const arr = new Float32Array(edgeBase.length * T.length);
      T.forEach((p, i) => {
        for (let j = 0; j < edgeBase.length; j += 3) { arr[i * edgeBase.length + j] = edgeBase[j] + p.x; arr[i * edgeBase.length + j + 1] = edgeBase[j + 1] + p.y; arr[i * edgeBase.length + j + 2] = edgeBase[j + 2] + p.z; }
        o.position.set(p.x, p.y, p.z); o.rotation.set(0, 0, 0); o.updateMatrix(); ghostFill.setMatrixAt(i, o.matrix);
      });
      ghostGeo.setAttribute('position', new Float32BufferAttribute(arr, 3));
      ghostGeo.computeBoundingSphere();
      ghostFill.instanceMatrix.needsUpdate = true;
      ghostKind = kind; ghostTo = 1;
    } else ghostTo = 0;
    if (calm) ghostK = ghostTo;
    kick();
  }

  // ---- file motion ----
  let trayS0 = 0;
  let cur = pile.map(p => ({ ...p })), from = null, to = null, t0 = 0, animating = false, mode = 'pile', onDone = null;
  let scanning = false, scanT = 0, scanFade = 0;
  const lift = new Float32Array(TYPES.length);
  function writeFiles() {
    cur.forEach((p, i) => { o.position.set(p.x, p.y + lift[i], p.z); o.rotation.set(p.rx, p.ry, 0); o.updateMatrix(); files.setMatrixAt(i, o.matrix); });
    files.instanceMatrix.needsUpdate = true;
  }
  writeFiles();
  function go(kind, done) {
    from = cur.map(p => ({ ...p }));
    to = kind === 'pile' ? pile : targets(kind);
    mode = kind; onDone = done || null;
    trayS0 = trays.visible ? trays.scale.x : 0;
    trays.visible = true;
    if (kind === 'folder' && ghostKind !== 'folder') setTrayOpacity(1);
    if (calm) { cur = to.map(p => ({ ...p })); writeFiles(); trays.scale.setScalar(kind === 'folder' ? 1 : .001); trays.visible = kind === 'folder'; setTrayOpacity(1); kick(); onDone && onDone(); return; }
    t0 = performance.now(); animating = true; kick();
  }

  // ---- time of day ----
  const L = { sky: new Color(), ground: new Color(), hi: 0, sun: new Color(), si: 0, sp: new Vector3(), glow: 0, star: 0 };
  const snap = () => ({ sky: hemi.color.clone(), ground: hemi.groundColor.clone(), hi: hemi.intensity, sun: sun.color.clone(), si: sun.intensity, sp: sun.position.clone(), glow: L.glow, star: L.star });
  const asT = (p) => ({ sky: new Color(p.sky), ground: new Color(p.ground), hi: p.hi, sun: new Color(p.sun), si: p.si, sp: new Vector3(...p.sp), glow: p.glow, star: p.star });
  let timeFrom = null, timeTo = null, timeT0 = 0, timeName = 'day';
  function applyTime(a, b, k) {
    hemi.color.copy(a.sky).lerp(b.sky, k); hemi.groundColor.copy(a.ground).lerp(b.ground, k); hemi.intensity = a.hi + (b.hi - a.hi) * k;
    sun.color.copy(a.sun).lerp(b.sun, k); sun.intensity = a.si + (b.si - a.si) * k; sun.position.copy(a.sp).lerp(b.sp, k);
    L.glow = a.glow + (b.glow - a.glow) * k; L.star = a.star + (b.star - a.star) * k;
    glowMat.opacity = L.glow; lampMat.emissiveIntensity = L.glow * 1.6; lampLight.intensity = L.glow * 38;
    starMat.opacity = L.star; stars.visible = L.star > .01;
    cloudBase = .92 - L.star * .35;
  }
  function setTime(name) {
    if (!TIMES[name]) return;
    timeName = name;
    timeFrom = snap(); timeTo = asT(TIMES[name]);
    if (calm) { applyTime(timeFrom, timeTo, 1); timeTo = null; kick(); return; }
    timeT0 = performance.now(); kick();
  }
  if (opts.time && TIMES[opts.time]) { timeName = opts.time; const p = asT(TIMES[opts.time]); applyTime(p, p, 1); }

  // ---- camera focus: 0 = whole island, 1 = close on the files ----
  let focusK = 0, focusTo = 0;
  const FOCUS = new Vector3(4.6, 4.8, 6.4), fw = new Vector3(), look = new Vector3();

  // ---- interaction: drag to turn, click Wren to hop ----
  let rotY = 0, targetRot = 0, drag = null, hopT = -1, idle = 0;
  const ray = new Raycaster(), v2 = new Vector2();
  const pick = (e) => { const r = canvas.getBoundingClientRect(); v2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(v2, camera); return ray.intersectObject(wm).length > 0; };
  canvas.addEventListener('pointerdown', (e) => { if (pick(e)) { hopT = performance.now(); kick(); opts.onWren && opts.onWren(); return; } drag = { x: e.clientX, r: targetRot }; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', (e) => { if (drag) { targetRot = drag.r + (e.clientX - drag.x) * .008; kick(); } else canvas.style.cursor = pick(e) ? 'pointer' : 'grab'; });
  const up = () => { drag = null; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);

  // ---- anchors the page can pin labels to ----
  const ANCH = {
    wren: () => new Vector3(wx, wren.position.y + 5.1, wz),
    files: () => { let x = 0, y = 0, z = 0; cur.forEach(p => { x += p.x; y = Math.max(y, p.y); z += p.z; }); return new Vector3(x / cur.length, y + 1.2, z / cur.length); },
    cabin: () => new Vector3(BX + 2.5 - C, by0 + 6.4, BZ + 2 - C),
    lamp: () => new Vector3(LX - C + .5, ly0 + 4.3, LZ - C + .5),
    hill: () => new Vector3(5 - C, top(5, 6) + 4.5, 6 - C)
  };
  const sv = new Vector3();
  function screen(name) {
    const f = ANCH[name]; if (!f) return null;
    sv.copy(f()); world.localToWorld(sv); sv.project(camera);
    return { x: (sv.x + 1) / 2 * canvas.clientWidth, y: (1 - sv.y) / 2 * canvas.clientHeight };
  }

  // ---- loop ----
  let raf = 0, visible = true, last = performance.now();
  function size() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.zoom = Math.min(1, w / h / 1.05);
    camera.updateProjectionMatrix();
  }
  function render() { renderer.render(scene, camera); onRender && onRender(api); }
  function frame(now) {
    raf = 0;
    const dt = Math.min(64, now - last); last = now;
    let busy = false;
    const still = calm || lite;
    if (!still) { idle += dt / 1000; busy = true; }
    rotY += (targetRot - rotY) * .12; if (Math.abs(targetRot - rotY) > .0005) busy = true;
    world.rotation.y = rotY + (still ? 0 : Math.sin(idle * .25) * .12);
    world.position.y = still ? 0 : Math.sin(idle * .8) * .15;
    world.updateMatrixWorld();
    clouds.children.forEach(g => { const u = g.userData; const a = u.a + (still ? 0 : idle * u.s); g.position.set(Math.cos(a) * u.r, u.y + Math.sin(idle * .5 + u.r) * .3, Math.sin(a) * u.r); });
    if (hopT >= 0) { const k = (now - hopT) / 420; if (k >= 1) { hopT = -1; wren.position.y = wy; } else { wren.position.y = wy + Math.sin(k * Math.PI) * .9; busy = true; } }
    // time of day
    if (timeTo) { const k = ease(Math.min(1, (now - timeT0) / 900)); applyTime(timeFrom, timeTo, k); if (k >= 1) timeTo = null; else busy = true; }
    if (!still && L.glow > .3) lampLight.intensity = L.glow * (36 + Math.sin(idle * 7) * 2.5);
    // camera focus
    if (Math.abs(focusTo - focusK) > .001) { focusK = calm ? focusTo : focusK + (focusTo - focusK) * .07; busy = true; } else focusK = focusTo;
    fw.copy(FOCUS); world.localToWorld(fw);
    look.copy(HOME).lerp(fw, focusK);
    camera.position.copy(look).addScaledVector(DIR, DIST * (1 - .56 * focusK));
    camera.lookAt(look);
    camera.updateMatrixWorld();
    clouds.children.forEach(g => { sv.copy(g.position).project(camera); const e = Math.max(Math.abs(sv.x), Math.abs(sv.y)); const f = Math.max(0, Math.min(1, (.8 - e) / .16)); const m = g.children[0]; m.material.opacity = cloudBase * f; m.visible = f > .01; });
    // plan ghosts
    if (ghostK !== ghostTo) { ghostK += Math.sign(ghostTo - ghostK) * Math.min(Math.abs(ghostTo - ghostK), dt / 380); busy = true; }
    ghostLines.material.opacity = ghostK * .85; ghostFill.material.opacity = ghostK * .22;
    ghostLines.visible = ghostFill.visible = ghostK > .01;
    if (ghostKind === 'folder' && mode === 'pile') { trays.visible = ghostK > .01; trays.scale.setScalar(Math.max(.001, ghostK)); setTrayOpacity(.25 + ghostK * .3); }
    // look: a wave of light passes over the files
    if (scanning || scanFade > 0) {
      scanFade = scanning ? Math.min(1, scanFade + dt / 300) : Math.max(0, scanFade - dt / 300);
      const w = ((now - scanT) / 1700 % 1) * (TYPES.length + 8) - 4;
      for (let i = 0; i < TYPES.length; i++) {
        const k = calm ? 0 : Math.max(0, 1 - Math.abs(i - w) / 3) * scanFade;
        files.setColorAt(i, col.copy(baseCol[i]).lerp(new Color('#ffffff'), k * .55));
        lift[i] = k * .35;
      }
      files.instanceColor.needsUpdate = true;
      if (!animating) writeFiles();
      busy = true;
    }
    if (animating) {
      const span = 760, stag = 34, total = span + stag * (TYPES.length - 1);
      const e0 = now - t0;
      cur = to.map((b, i) => { const a = from[i]; const k = ease(Math.max(0, Math.min(1, (e0 - i * stag) / span))); return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k + Math.sin(k * Math.PI) * 1.6, z: a.z + (b.z - a.z) * k, ry: a.ry + (b.ry - a.ry) * k, rx: a.rx + (b.rx - a.rx) * k }; });
      writeFiles();
      if (!(ghostKind === 'folder' && mode === 'pile')) {
        const ts = mode === 'folder' ? trayS0 + (1 - trayS0) * ease(Math.min(1, e0 / 400)) : 1 - ease(Math.min(1, e0 / 300));
        trays.scale.setScalar(Math.max(.001, ts));
        if (mode === 'folder') setTrayOpacity(Math.min(1, .55 + e0 / 500));
      }
      if (e0 >= total) { animating = false; trays.visible = mode === 'folder'; if (mode === 'folder') setTrayOpacity(1); cur = to.map(p => ({ ...p })); writeFiles(); if (mode !== 'pile') hopT = now; onDone && onDone(); }
      busy = true;
    }
    render();
    if (busy && visible) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  new ResizeObserver(() => { size(); kick(); }).observe(canvas);
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe(canvas);

  const api = {
    arrange: (kind, done) => go(kind, done),
    reset: () => go('pile'),
    setCalm: (v) => { calm = v; kick(); },
    setTime,
    get time() { return timeName; },
    scan: (v) => { if (v && !scanning) scanT = performance.now(); scanning = !!v; kick(); },
    plan: (kind) => setGhosts(kind),
    focus: (k) => { focusTo = Math.max(0, Math.min(1, k)); kick(); },
    hop: () => { hopT = performance.now(); kick(); },
    screen,
    get mode() { return mode; },
    voxels: list.length + wcells.length + TYPES.length
  };
  size(); kick();
  return api;
}
