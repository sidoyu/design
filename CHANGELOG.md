# Changelog

표기 규칙(semver-lite):
- **major** — 기존 소비처가 깨지는 변경(토큰 삭제·개명, 컴포넌트 API 변경)
- **minor** — 추가만 있는 변경(새 토큰·새 컴포넌트)
- **patch** — 값 미세 조정·문서·버그픽스

단, 1.0 이전에는 minor 릴리스가 breaking 변경을 포함할 수 있다(semver 0.x 관행 — v0.3.0·v0.4.0·v0.5.0이 이에 해당). major 승격은 1.0.0 도달 시점에 판단한다.

소비처는 `main`이 아니라 **버전 태그를 고정**해서 가져간다. 버전을 올릴 땐 breaking 항목에 마이그레이션 메모를 함께 적는다.

## v0.5.2 — 2026-08-18

**patch** — BackLink 터치 타깃 양축 보장. 근거: v0.5.1 완료점검(Codex 4b)에서 §9 "24×24"와 구현 계약(`min-h-6`만) 사이의 갭 지적.

- **BackLink**: `min-w-6` 추가 — 높이에 이어 폭도 구조적으로 24px 보장(짧은 라벨 엣지 케이스 방어).
- 마이그레이션: `back-link.tsx` 재복사. 그 외 변경 없음.

## v0.5.1 — 2026-08-18

**patch** — 링크 Card 호버 틴트 확장 정본화 + 문서 정합. 근거: 2026-08-18 디자인 시스템 리뷰(Codex 동행)에서 확인된 소비처 드리프트·문서 모순 해소.

- **Card(링크형)**: 호버 틴트에 `-mx-2 px-2` — 텍스트 기준선은 유지한 채 틴트만 좌우 8px 확장(표준 그리드 `gap-4`에서 인접 카드와 겹치지 않는 상한). 소비처 sidoyu.com이 먼저 검증한 픽스(f2dcb1b→a96952d)를 정본으로 수용.
- DESIGN.md 정합 7건: 서두 정본 권한 분리(값=tokens.json·의미/규칙=DESIGN.md) · §2 트랜잭션 이메일을 "색·타이포 토큰만"으로 한정 · §3 `line` 용도를 "구분선·비기능 테두리"로 한정(§6 입력창 `border-ink`와의 문언 충돌 해소) · §6 프리미티브 7종 셈법 명시(export 단위) · §6 폼 에러 `aria-describedby` 연결 규정 · §9 터치 타깃 24×24 양축 명시 · §14 Figma 생성 목록에서 삭제된 radius 잔재 제거.
- 토큰 값 변경 없음 — meta.version만 0.5.1.
- 마이그레이션: `card.tsx` + dist 재복사. sidoyu.com은 픽스 원산지라 card.tsx 동작 변화 없음(주석만 갱신), dist는 헤더만 갱신.

## v0.5.0 — 2026-08-18

**breaking** — PageShell 단일 좌측 기준선(gov.uk 문법). 근거: reading/narrow 페이지가 중앙 배치라 본문 시작선이 헤더 로고와 어긋나던 문제(2026-08-18 sidoyu.com 정렬 결정).

- **PageShell 2층 구조**: 바깥 `<main>`은 항상 `mx-auto w-full max-w-wide px-6 pt-6 pb-14`(wide 중앙 배치), 안쪽 div가 `max-w-reading`/`max-w-narrow`를 **왼쪽 정렬**로 적용. 폭 3종의 의미가 "컨테이너 중앙 배치" → **"줄 길이(measure) 상한"**으로 바뀜 — 모든 페이지 본문이 헤더 로고와 같은 왼쪽 기준선에서 시작.
- **breaking**: `className` prop이 바깥 `<main>`이 아니라 **안쪽 콘텐츠 레이어**에 적용된다. 바깥 틀을 겨냥하던 className은 소비처에서 재검토.
- **BackLink 프리미티브 신설**(6종→7종): 상세(자식) 페이지 상단 뒤로가기 표준 — `text-xs text-ink-faint` + `brand-underline brand-ring`, `min-h-6`으로 터치 타깃 24px 확보. 상세 페이지의 첫 요소로 쓰고 다음 블록은 `mt-3`.
- 구조 변경으로 페이지 패딩 `px-6`이 measure 밖으로 나가 **실측 본문 폭이 토큰 값과 정확히 일치**(기존 대비 +48px, reading=48rem=768px 그대로).
- 토큰 값 변경 없음(컨테이너 64/48/28rem 불변) — meta.version만 0.5.0.
- DESIGN.md: §5 컨테이너 절 재정의(단일 좌측 기준선·measure·인셋 텍스트 `border-l-2 border-line pl-3`), §6 PageShell 2층 구조·BackLink 스펙(6종→7종).
- 마이그레이션: `page-shell.tsx` 재복사 + `back-link.tsx` 신규 복사 + dist 재복사. PageShell `className`이 바깥 틀을 겨냥했는지 점검하고, 상세 페이지의 인라인 뒤로가기 링크는 BackLink로 교체.

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
