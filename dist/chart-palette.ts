/* AUTO-GENERATED from tokens/tokens.json — 손으로 편집하지 말 것. (sidoyu-design v0.2.0)
 * 데이터 시각화 전용 팔레트. UI 색은 tokens.css의 시맨틱 토큰을 사용할 것. */
export const FAMILY_COLORS: Record<string, string> = {
  "claude-fable": "#D97706",
  "claude-opus": "#16A34A",
  "claude-sonnet": "#4F46E5",
  "claude-haiku": "#0891B2",
  "codex": "#EA580C",
  "claude-api": "#7C3AED",
  "gpt-api": "#0EA5E9",
  "gemini": "#DB2777",
  "grok": "#525252",
  "replicate": "#E11D48",
  "other": "#A3A3A3",
};

export const HEATMAP_LEVELS: string[] = [
  "#EBEDF0",
  "#C6E9C9",
  "#86D993",
  "#3FB55C",
  "#16A34A",
];

/* 히트맵 셀·범례 스와치 모서리 — UI radius 토큰과 격리된 차트 전용 값 */
export const HEATMAP_CELL_RADIUS = "4px";

export const TOKEN_COMPOSITION: Record<string, string> = {
  "input": "#4F46E5",
  "output": "#16A34A",
  "cache-read": "#0891B2",
  "cache-write": "#A3A3A3",
};

export const CHART_AXIS = {
  grid: "rgba(0, 0, 0, 0.06)",
  tick: "rgba(0, 0, 0, 0.55)",
} as const;
