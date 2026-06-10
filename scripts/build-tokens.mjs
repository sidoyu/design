#!/usr/bin/env node
/**
 * tokens/tokens.json(단일 원본) → dist/ 산출물 생성.
 * 외부 의존성 0. 실행: node scripts/build-tokens.mjs
 *
 * 산출물:
 *   dist/tokens.css        — Tailwind 4 @theme 블록 (emitCss=false 그룹 제외)
 *   dist/chart-palette.ts  — 차트 전용 팔레트 (앱에 복사해 사용)
 *   dist/tokens.flat.json  — 평면 맵 (Figma 변수 생성·기타 플랫폼용)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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
const CSS_NAMESPACE = { color: "color", radius: "radius", container: "container" };
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
${Object.entries(tokens.chart.heatmap).filter(([, n]) => isToken(n)).map(([, n]) => `  "${n.$value}",`).join("\n")}
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
writeFileSync(join(root, "dist", "chart-palette.ts"), chartTs);
writeFileSync(join(root, "dist", "tokens.flat.json"), JSON.stringify({ version: tokens.meta.version, tokens: flat }, null, 2) + "\n");
console.log(`[build-tokens] OK: dist/tokens.css(${lines.length} vars), chart-palette.ts, tokens.flat.json(${Object.keys(flat).length} tokens)`);
