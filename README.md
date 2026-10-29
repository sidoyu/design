# sidoyu design

Personal design system for [sidoyu.com](https://sidoyu.com) and sidoyu's personal projects.
**White surface · black ink · neon green (#28FF35) accent · Geist.** Light-only by design.

## 구조

```
tokens/tokens.json        ← 단일 원본 (이 파일만 손편집)
scripts/build-tokens.mjs  → npm run build
dist/                     ← 소비처는 이 폴더에서 복사 (첫 줄 버전 도장 확인)
  tokens.css              ← Tailwind 4 @theme
  tokens.vars.css         ← 일반 CSS 용 :root 변수 (tokens.css 와 같은 이름·값)
  base.css                ← 모양 정본 sd-* 클래스 (registry/ui/base.css + 버전 도장)
  chart-palette.ts        ← 차트 전용 팔레트 (앱에 복사)
  tokens.flat.json        ← Figma·메일·확장 팝업용 평면 맵
registry/ui/              ← base.css 소스 + React 껍데기 8종 (PageShell·BackLink·Card·Button·Input·Textarea·Badge·Segmented) + prose.css
scripts/design-check.sh   ← 금지 패턴 검사 (소비처에 복사)
docs/DESIGN.md            ← 전체 스펙 (단일 권위 문서)
```

## 사용

새 프로젝트 적용 절차는 [docs/DESIGN.md §11](docs/DESIGN.md), 규칙 전문은 같은 문서 전체 참조.
소비처는 release tag를 고정해서 가져갑니다 (`main` 추적 금지). 변경 이력: [CHANGELOG.md](CHANGELOG.md).

```bash
npm run build   # tokens.json → dist/ 재생성 + tsx 버전 도장 갱신
npm run check   # 금지 패턴 검사 (현재 디렉터리 기준 · 0=통과 1=위반 2=검사 대상 없음)
```

Tailwind 소비처는 `@import "./design/base.css" layer(components);`, 일반 CSS 소비처는 `<link>` 로 `tokens.vars.css` → `base.css` 순서로 가져옵니다([DESIGN.md §17](docs/DESIGN.md)).

## 원칙 요약

1. 라이트 전용 — `dark:` 금지
2. 네온 그린은 정체성 포인트 (링크 밑줄·포커스 링 바깥 테·호버 틴트·선택영역) — 선택·역할·상태 표시에 쓰지 않음
3. 상태색은 `error`·`attention` 두 개뿐이고 글자·선·작은 표지에만 — 언제나 문구와 함께
4. 시맨틱 토큰 우선 — raw hex·임의 투명도 금지. 라운딩·그림자·박스 없음(직각·플랫, 구획은 수평선·여백)
5. 차트 팔레트는 UI와 격리 (판독성 우선 · 차트에 UI 상태색도 금지)
6. 과토큰화 회피 — 간격은 Tailwind 기본 스케일, 페이지 표준은 PageShell이 강제

MIT © 2026 Dongyun Shin (sidoyu)
