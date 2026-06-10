# sidoyu design

Personal design system for [sidoyu.com](https://sidoyu.com) and sidoyu's personal projects.
**White surface · black ink · neon green (#28FF35) accent · Geist.** Light-only by design.

## 구조

```
tokens/tokens.json        ← 단일 원본 (이 파일만 손편집)
scripts/build-tokens.mjs  → npm run build
dist/
  tokens.css              ← Tailwind 4 @theme (소비처가 import)
  chart-palette.ts        ← 차트 전용 팔레트 (앱에 복사)
  tokens.flat.json        ← Figma·비 Tailwind 플랫폼용 평면 맵
registry/ui/              ← 프리미티브 6종 소스 (PageShell·Card·Button·Input·Badge·base.css)
scripts/design-check.sh   ← 금지 패턴 검사 (소비처에 복사)
docs/DESIGN.md            ← 전체 스펙 (단일 권위 문서)
```

## 사용

새 프로젝트 적용 절차는 [docs/DESIGN.md §11](docs/DESIGN.md), 규칙 전문은 같은 문서 전체 참조.
소비처는 release tag를 고정해서 가져갑니다 (`main` 추적 금지). 변경 이력: [CHANGELOG.md](CHANGELOG.md).

```bash
npm run build   # tokens.json → dist/ 재생성
npm run check   # 금지 패턴 검사 (현재 디렉터리 기준)
```

## 원칙 요약

1. 라이트 전용 — `dark:` 금지
2. 네온 그린은 포인트 전용 (호버 틴트·밑줄·선택영역·포커스 링)
3. 시맨틱 토큰 우선 — raw hex·임의 투명도·임의 radius 금지
4. 차트 팔레트는 UI와 격리 (판독성 우선)
5. 과토큰화 회피 — 간격은 Tailwind 기본 스케일, 페이지 표준은 PageShell이 강제

MIT © 2026 Dongyun Shin (sidoyu)
