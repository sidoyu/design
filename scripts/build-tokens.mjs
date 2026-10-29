#!/usr/bin/env node
/**
 * tokens/tokens.json(단일 원본) → dist/ 산출물 생성.
 * 외부 의존성 0. 실행: node scripts/build-tokens.mjs
 *
 * 산출물:
 *   dist/tokens.css        — Tailwind 4 @theme 블록 (emitCss=false 그룹 제외)
 *   dist/tokens.vars.css   — 같은 이름의 :root 변수 (일반 CSS 소비처용, v0.6.0)
 *   dist/base.css          — registry/ui/base.css 복사본 + 첫 줄 버전 도장 (v0.6.0 — 도장은 여기 한 곳)
 *   dist/prose.css         — registry/ui/prose.css 복사본 + 버전 도장 (v0.7.0)
 *   dist/design-check.sh   — scripts/design-check.sh 복사본 + 버전 도장 (v0.7.0)
 *   dist/chart-palette.ts  — 차트 전용 팔레트 (앱에 복사해 사용)
 *   dist/tokens.flat.json  — 평면 맵 (Figma 변수 생성·기타 플랫폼용)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens", "tokens.json"), "utf8"));

const isToken = (node) => node && typeof node === "object" && "$value" in node;
const emitCss = (group) => group?.$extensions?.["com.sidoyu"]?.emitCss !== false;

// ── 검증: brand-hover/brand-selection은 brand와 같은 RGB여야 한다
function parseRgb(value) {
  const hex = value.match(/^#([0-9a-fA-F]{6})$/);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgba = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgba) return [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])];
  return null;
}
const brandRgb = parseRgb(tokens.color.brand.$value);
for (const name of ["brand-hover", "brand-selection"]) {
  const rgb = parseRgb(tokens.color[name].$value);
  if (!rgb || !brandRgb || rgb.join() !== brandRgb.join()) {
    console.error(`[build-tokens] FAIL: color.${name}의 RGB가 color.brand(${tokens.color.brand.$value})와 다릅니다: ${tokens.color[name].$value}`);
    process.exit(1);
  }
}

// ── dist/tokens.css
const CSS_NAMESPACE = { color: "color", container: "container", font: "font" };
const lines = [];
for (const [groupName, ns] of Object.entries(CSS_NAMESPACE)) {
  const group = tokens[groupName];
  if (!group || !emitCss(group)) continue;
  for (const [name, node] of Object.entries(group)) {
    if (!isToken(node)) continue;
    lines.push(`  --${ns}-${name}: ${node.$value};`);
  }
}
const css = `/* AUTO-GENERATED from tokens/tokens.json — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version}) */
@theme {
${lines.join("\n")}
}
`;

// ── dist/tokens.vars.css (일반 CSS 소비처 — tokens.css 와 같은 변수 이름·값)
const varsCss = `/* AUTO-GENERATED from tokens/tokens.json — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version})
 * 일반 CSS 소비처용. Tailwind 소비처는 tokens.css(@theme)를 쓴다 — 두 파일의 변수 이름은 같다. */
:root {
${lines.join("\n")}
}
`;

// ── dist/base.css (모양 정본 복사 + 버전 도장. 소스에는 버전을 손으로 적지 않는다)
const baseSrc = readFileSync(join(root, "registry", "ui", "base.css"), "utf8");
const baseCss = `/* AUTO-GENERATED from registry/ui/base.css — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version}) */
${baseSrc}`;

// ── dist/prose.css · dist/design-check.sh (v0.7.0 — 소비처가 복사하는 파일은 모두 dist/ 에서 도장과 함께 나간다)
const proseSrc = readFileSync(join(root, "registry", "ui", "prose.css"), "utf8");
const proseCss = `/* AUTO-GENERATED from registry/ui/prose.css — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version}) */
${proseSrc}`;
const checkSrc = readFileSync(join(root, "scripts", "design-check.sh"), "utf8");
if (!checkSrc.startsWith("#!/usr/bin/env bash\n")) {
  console.error("[build-tokens] FAIL: scripts/design-check.sh 첫 줄이 #!/usr/bin/env bash 가 아닙니다");
  process.exit(1);
}
const checkSh = checkSrc.replace(
  "#!/usr/bin/env bash\n",
  `#!/usr/bin/env bash\n# AUTO-GENERATED from scripts/design-check.sh — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version})\n`,
);

// ── dist/chart-palette.ts
const tsObj = (group) =>
  Object.entries(group)
    .filter(([, node]) => isToken(node))
    .map(([name, node]) => `  "${name}": "${node.$value}",`)
    .join("\n");
const chartTs = `/* AUTO-GENERATED from tokens/tokens.json — 손으로 편집하지 말 것. (sidoyu-design v${tokens.meta.version})
 * 데이터 시각화 전용 팔레트. UI 색은 tokens.css의 시맨틱 토큰을 사용할 것. */
export const FAMILY_COLORS: Record<string, string> = {
${tsObj(tokens.chart.family)}
};

export const HEATMAP_LEVELS: string[] = [
${Object.entries(tokens.chart.heatmap).filter(([, n]) => isToken(n) && n.$type === "color").map(([, n]) => `  "${n.$value}",`).join("\n")}
];

export const TOKEN_COMPOSITION: Record<string, string> = {
${tsObj(tokens.chart["token-composition"])}
};

export const CHART_AXIS = {
  grid: "${tokens.chart.axis.grid.$value}",
  tick: "${tokens.chart.axis.tick.$value}",
} as const;
`;

// ── dist/tokens.flat.json (Figma 변수·타 플랫폼용 평면 맵)
const flat = {};
(function walk(node, path) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$") || key === "meta") continue;
    if (isToken(child)) {
      flat[[...path, key].join(".")] = { value: child.$value, type: child.$type ?? null };
    } else if (child && typeof child === "object") {
      walk(child, [...path, key]);
    }
  }
})(tokens, []);

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "tokens.css"), css);
writeFileSync(join(root, "dist", "tokens.vars.css"), varsCss);
writeFileSync(join(root, "dist", "base.css"), baseCss);
writeFileSync(join(root, "dist", "prose.css"), proseCss);
writeFileSync(join(root, "dist", "design-check.sh"), checkSh, { mode: 0o755 });
writeFileSync(join(root, "dist", "chart-palette.ts"), chartTs);
writeFileSync(join(root, "dist", "tokens.flat.json"), JSON.stringify({ version: tokens.meta.version, tokens: flat }, null, 2) + "\n");

// ── registry/ui/*.tsx 첫 줄 버전 도장 — 소비처 복사본의 버전 식별용. 값은 tokens.meta.version 한 곳에서 온다.
const STAMP_RE = /^\/\/ sidoyu-design v[^\n]*\n/;
const stamp = `// sidoyu-design v${tokens.meta.version} — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)\n`;
const uiDir = join(root, "registry", "ui");
for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
  const path = join(uiDir, file);
  const src = readFileSync(path, "utf8");
  const next = stamp + src.replace(STAMP_RE, "");
  if (next !== src) writeFileSync(path, next);
}
console.log(`[build-tokens] OK: dist/tokens.css·tokens.vars.css(${lines.length} vars), base.css, prose.css, design-check.sh, chart-palette.ts, tokens.flat.json(${Object.keys(flat).length} tokens)`);
