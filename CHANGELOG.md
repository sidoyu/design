# Changelog

표기 규칙(semver-lite):
- **major** — 기존 소비처가 깨지는 변경(토큰 삭제·개명, 컴포넌트 API 변경)
- **minor** — 추가만 있는 변경(새 토큰·새 컴포넌트)
- **patch** — 값 미세 조정·문서·버그픽스

소비처는 `main`이 아니라 **버전 태그를 고정**해서 가져간다. 버전을 올릴 땐 breaking 항목에 마이그레이션 메모를 함께 적는다.

## v0.4.0 — 2026-06-11

**breaking** — 박스 폐지·기능적 테두리(gov.uk 문법). 근거: 사용자 가치 "장식 없는 기능적 웹"(2026-06-11, gov.uk 참조 결정).

- **Card 재정의**: 사면 박스(`border border-line p-5`) → **상단 룰 블록**(`border-t border-line py-5`). API(eyebrow/title/description/href)는 그대로 — 소비처 코드 무수정 재컴파일 가능, 시각만 전환.
- **Input/Textarea**: `border border-line` → **`border-2 border-ink`**(입력 영역 기능 신호).
- **Button ghost**: 테두리 → **`bg-surface-subtle` 면**(gov.uk secondary 문법).
- design-check: `border border-line` 사면 박스 금지 패턴. 기능 테두리(차트 툴팁·세그먼트 컨트롤·색 스와치 등)는 `.design-check.allow`에 사유와 함께.
- DESIGN.md: 원칙 3-2(박스 금지), §6 스펙 갱신.
- 마이그레이션: dist·프리미티브 4종·design-check.sh 재복사. 페이지의 인라인 박스 마크업(`border border-line`)은 수평선 구획으로 전환하거나 allow 등록.

## v0.3.0 — 2026-06-11

**breaking** — 직각·플랫 전환(Metro UI풍). 근거: 둥근 카드가 'AI 생성물' 인상(2026-06-11 사용자 결정).

- **radius 토큰 삭제**(`radius.card`·`radius.control`) + `chart.heatmap.cell-radius`·`HEATMAP_CELL_RADIUS` 삭제. 프리미티브 4종(Card·Button·Input·Badge)에서 `rounded-*` 제거(Badge 알약형 폐지), prose.css pre는 `border-radius: 0`.
- design-check: **`rounded*` 전면 금지** 패턴(기존 radius 패턴 3종 통합) + `shadow-*`/`backdrop-*` 금지 패턴 신설(§13 그림자 금지의 검사화).
- base.css: **폼 컨트롤 직각 강제**(`button/input/select/textarea { border-radius: 0 }` + search 입력 `appearance: none` — Safari 기본 라운딩 차단). Card 링크 변형에 `brand-ring` 추가(§9 포커스 의무 — 기존 누락 수정).
- DESIGN.md: §1 정체성 "직각 모서리·플랫"+원칙 3-1, §6 컴포넌트 스펙, §12 금지 패턴, §13 의도적 제외(라운딩) 갱신.
- **마이그레이션(필수)**: 소비처는 `rounded-card`·`rounded-control`·`rounded-full`·`rounded` 클래스와 inline `borderRadius`를 전부 제거(토큰이 사라져 클래스가 무효 — 잔류 시 design-check가 잡음). dist 산출물·프리미티브·prose.css·design-check.sh 재복사.

## v0.2.1 — 2026-06-11

patch — 검사·문서 보강 (v0.2.0 적용 직후 2차 검토 후속). 토큰 변경 없음.

- design-check: 임의 간격 경계에 backtick·single quote 추가(템플릿 리터럴 className 누락 보완), `gap`·`space-x/y` 임의값, **단독 `rounded`(4px)** 검출 추가, 팔레트 색 prefix 7종 확장(`from/via/to/accent/caret/divide/placeholder`).
- DESIGN.md §8: 로딩 스켈레톤 `animate-pulse` 공식 예외 명문화 + `transition-opacity` 금지 명시(호버 피드백은 색으로). §12 단독 `rounded` 행 갱신.

## v0.2.0 — 2026-06-11

minor — 긴 글(prose) 토큰화 + 차트 radius 토큰 + 검사 패턴 보강. 전부 추가만(breaking 없음).

- **`registry/ui/prose.css` 신규** — `@tailwindcss/typography` 소비처용 토큰 글루. `--tw-prose-*` 변수 전체를 시맨틱 토큰으로 강제, 제목 크기·굵기를 6단 스케일로 정렬(h1=2xl/bold·h2=lg/semibold·h3=base·h4=sm), 링크=brand-underline 시각, pre radius=control, `max-width:none`(폭은 PageShell).
- **`chart.heatmap.cell-radius` 토큰 신규(4px)** → `chart-palette.ts`에 `HEATMAP_CELL_RADIUS` 발행. 히트맵 셀의 `rounded-[4px]` 임의값 대체. 빌드가 heatmap 그룹을 `$type:"color"`로 필터해 `HEATMAP_LEVELS` 오염 방지.
- **design-check 패턴 4종 추가**: 임의 텍스트 크기(`text-[..]`)·임의 radius(`rounded-[..]`)·임의 간격(`p*/m*-[..]`)·Tailwind 팔레트 색(`red-600` 등).
- **DESIGN.md**: prose.css 절(§6)·폼 에러 문구 규칙(`text-sm font-medium text-ink`+`role="alert"`, 의미 색 금지)·HEATMAP_CELL_RADIUS(§7)·금지 패턴 2행 추가.
- 마이그레이션(선택): 소비처는 `prose.css` 복사+import, `chart-palette.ts`·`design-check.sh` 재복사. 기존 `prose-neutral`·`max-w-none`·`prose-invert` 클래스는 제거.

## v0.1.1 — 2026-06-11

patch — 프리미티브 prop 타입 수정.

- Input·Textarea·Button·ButtonLink·Badge의 prop 타입을 `React.*HTMLAttributes`에서 `React.ComponentProps<"...">`로 교체 — React 19 ref-as-prop(`<Textarea ref={...}>`)이 타입 에러 나던 결함 수정(sidoyu.com Phase 2 적용 중 발견). 런타임 변화 없음.

## v0.1.0 — 2026-06-10

최초 발행.

- 토큰 단일 원본 `tokens/tokens.json` (색 9·radius 2·컨테이너 3·모션 1·타이포 8·차트 21·이메일 3)
- 빌드 파이프라인 `scripts/build-tokens.mjs` → `dist/tokens.css`(@theme)·`chart-palette.ts`·`tokens.flat.json`
- 프리미티브 6종: PageShell·Card·Button(+ButtonLink)·Input(+Textarea)·Badge·base.css
- 스펙 문서 `docs/DESIGN.md`
- 금지 패턴 검사 `scripts/design-check.sh`
- 주요 결정: 라이트 전용(다크모드 없음)·네온 그린은 포인트 전용·차트 팔레트 격리·텍스트 투명도 하한 0.55(AA)
