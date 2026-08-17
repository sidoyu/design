# sidoyu design system — DESIGN.md

> 단일 권위 스펙. 코드·Figma·문서가 충돌하면 **`tokens/tokens.json` + 이 문서**가 이긴다.
> 버전: v0.5.0 (2026-08-18) · 변경 이력은 `CHANGELOG.md`

---

## 1. 정체성과 원칙

**흰 바탕 + 검정 잉크 + 네온 그린 포인트.** Geist 타이포그래피, **직각 모서리, 박스 없음** — 구획은 수평선·여백·타이포그래피로(gov.uk 문법). 플랫, 장식 없음. 기능적인 웹.

1. **라이트 전용.** 다크모드는 만들지 않는다. `dark:` 클래스 금지. 시스템 다크모드도 무시한다(`color-scheme: light`) — 카카오 인앱 브라우저 등에서 강제 반전을 막기 위한 의도적 결정.
2. **네온 그린(#28FF35)은 포인트 전용.** 허용: 호버 틴트·링크 밑줄·선택영역·포커스 링. 금지: 넓은 면 배경, 텍스트 색(흰 배경 대비 1.36:1 — 판독 불가).
3. **시맨틱 토큰 우선.** raw 색·임의 투명도 직접 사용 금지. 토큰에 없는 값이 필요하면 먼저 토큰을 추가한다(이 문서와 함께).
3-1. **모서리는 직각.** 라운딩 전면 금지(`rounded*`·`border-radius` — radius 토큰은 v0.3.0에서 삭제). 그림자·블러도 금지(포커스 링 box-shadow만 예외). 2026-06-11 결정: 둥근 카드가 'AI 생성물' 인상을 줌 — 플랫·샤프로 전환.
3-2. **박스 금지(v0.4.0).** 콘텐츠를 사면 테두리 상자에 담지 않는다. 구획은 **수평선(`border-t/b border-line`)·여백·타이포 위계**로만. 테두리는 기능이 요구하는 곳에만: 입력창 `border-2 border-ink`(입력 영역 식별), 표 행 구분선. 면(`bg-surface-subtle`)은 버튼·배지·표 헤더 같은 작은 기능 요소에만 — 넓은 콘텐츠 면 금지. 2026-06-11 결정: gov.uk식 기능 우선("박스도 장식이다").
4. **색 단독으로 정보를 전달하지 않는다.** 차트·상태 표시는 텍스트·수치 병행.
5. **과토큰화 회피.** 간격은 Tailwind 기본 4px 스케일을 그대로 쓰고, 페이지 표준은 PageShell이 강제한다. 그림자·z-index·애니메이션 토큰은 의도적으로 없다(§13).

## 2. 지원 범위

| 구분 | 대상 |
|---|---|
| **Current** | 웹(Next.js+Tailwind 4), PWA, Chrome 확장 팝업(토큰만), 게임 UI 크롬(토큰만), 트랜잭션 이메일 |
| **Deferred** | 네이티브 앱(iOS/Android) — 현재 0개. 존재하지 않는 플랫폼용 스펙은 만들지 않는다 |
| **Trigger** | 네이티브 앱 착수 시: 터치 타깃(≥44pt)·내비게이션·플랫폼 컴포넌트·에셋 내보내기 절을 이 문서에 추가하고 minor 버전 업 |

### 적용 자산 인벤토리 (2026-06-10 확정)

| 자산 | 적용 수준 | 상태 |
|---|---|---|
| sidoyu.com | 전면 적용 (1차 소비자) | ✅ v0.5.0 적용 중 |
| 개인 PWA 1종 | 토큰+일부 프리미티브 | Phase 5 예정 |
| Chrome 확장 1종 | 색·타이포 토큰만 | Phase 5 예정 |
| 웹게임 1종 | UI 크롬만 | 재기획 통과 후 (Phase 5) |
| CLI 도구들 | 해당 없음 | — |

> 구체 프로젝트 식별·진행 상태는 비공개 운영 노트에서 관리한다(public repo에 미기재).

## 3. 색 토큰

원본: `tokens/tokens.json` → 발행: `dist/tokens.css`(Tailwind `@theme`). 유틸리티 예: `bg-brand-hover` `text-ink-muted` `border-line`.

| 토큰 | 값 | 용도 | 금지 |
|---|---|---|---|
| `brand` | `#28FF35` | 포커스 링·밑줄 장식 | 면 배경·텍스트 |
| `brand-hover` | `rgba(40,255,53,.12)` | 인터랙티브 호버 배경 | 정적 요소에 사용 |
| `brand-selection` | `rgba(40,255,53,.22)` | `::selection` 전용 | 그 외 전부 |
| `ink` | `#000` | 제목·본문·solid 버튼 배경 | — |
| `ink-muted` | `rgba(0,0,0,.70)` | 보조 본문·설명 (대비 ≈7.3:1) | — |
| `ink-faint` | `rgba(0,0,0,.55)` | 메타·라벨·날짜 (대비 ≈4.6:1, AA 최소) | **이보다 옅은 텍스트 금지** |
| `surface` | `#FFF` | 페이지 배경(구획 블록은 투명) | — |
| `surface-subtle` | `rgba(0,0,0,.03)` | 테이블 헤더·배지 배경 | — |
| `line` | `rgba(0,0,0,.10)` | 모든 테두리·구분선 | 임의 투명도 변형 |

마이그레이션 매핑: `black/70·/60→ink-muted`, `black/50·/45·/40→ink-faint`, `black/10·/15·/20(테두리)→line`, `black/[.03]·/5(배경)→surface-subtle`. 더 보조적인 텍스트가 필요하면 색을 더 옅게 하지 말고 **크기·위치·간격**으로 위계를 만든다.

## 4. 타이포그래피

- 폰트: **Geist**(본문·제목), **Geist Mono**(코드·표 숫자, `tabular-nums` 병용). next/font로 로딩하고 앱 glue에서 연결(§11).
- 크기는 **6단만 허용**: `text-xs`(12 메타·라벨) · `text-sm`(14 본문 기본) · `text-base`(16 긴 글) · `text-lg`(18 섹션 제목) · `text-2xl`(24 페이지 제목) · `text-3xl`(30 대시보드 KPI 한정).
- 굵기 규칙: `font-bold`=페이지 제목 · `font-semibold`=섹션·카드 제목 · `font-medium`=라벨·버튼. 그 외 굵기 금지.
- 소문자 라벨(eyebrow)은 `text-xs tracking-wide uppercase text-ink-faint`.
- 줄간격은 Tailwind 기본값. 커스텀 leading 금지(긴 글은 prose 영역에 위임).
- prose 영역의 제목 크기·굵기는 `prose.css`가 6단 스케일로 정렬한다: h1=2xl/bold · h2=lg/semibold · h3=base/semibold · h4=sm/semibold (§6 prose.css).

## 5. 간격·레이아웃

- **페이지 틀은 PageShell이 유일한 진입점**: 바깥 틀은 항상 **wide(64rem) 중앙 배치**(`mx-auto w-full max-w-wide px-6 pt-6 pb-14`). 모든 페이지의 본문 왼쪽 시작선 = 헤더 로고 왼쪽 선(**단일 좌측 기준선**, gov.uk 문법). 페이지마다 패딩을 손대지 않는다.
- 폭 3종은 **컨테이너 위치가 아니라 줄 길이(measure) 상한**: reading/narrow는 안쪽 콘텐츠 레이어에 왼쪽 정렬로 적용된다(중앙 배치 아님).

| 폭 | 토큰 | 값 | 의미(줄 길이 상한) |
|---|---|---|---|
| `wide` | `max-w-wide` | 64rem(1024px) | 바깥 틀 폭 그대로(상한 미적용) — 카드 그리드·표(홈·플레이그라운드) |
| `reading` | `max-w-reading` | 48rem(768px) | 글·리스트·대시보드의 줄 길이 상한 (기본값) |
| `narrow` | `max-w-narrow` | 28rem(448px) | 폼(CV·연락처)의 줄 길이 상한 |

- 페이지 패딩 `px-6`은 바깥 틀에 있어 measure 밖 — 실측 본문 폭이 토큰 값 그대로다(reading=48rem=768px).
- 간격 표준: 구획 블록(Card) 세로 `py-5` · 그리드/리스트 간격 `gap-4` · 섹션 사이 `mt-10` · 제목 아래 `mt-2` · 라벨-입력 `gap-2`.
- 인셋 텍스트: 보조 주석 블록은 `border-l-2 border-line pl-3`(gov.uk inset text 문법 — 사면 박스 금지(§1-3-2)의 대체).
- 그리드: wide 페이지는 `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`.

## 6. 컴포넌트 스펙 (프리미티브 7종)

소스: `registry/ui/`. **variant 추가는 이 문서 갱신이 선행 조건** — 페이지별 예외를 컴포넌트가 흡수하기 시작하면 시스템이 무너진다.

### PageShell
모든 페이지의 루트. `width="wide|reading|narrow"`(기본 reading). §5 값 강제.
**2층 구조(v0.5.0)**: 바깥 `<main>`은 항상 `mx-auto w-full max-w-wide px-6 pt-6 pb-14`(wide 중앙 배치), 안쪽 div가 `max-w-reading`/`max-w-narrow`를 왼쪽 정렬로 적용 — 모든 본문이 헤더와 같은 왼쪽 기준선에서 시작(§5). **breaking**: `className`은 바깥 `<main>`이 아니라 안쪽 콘텐츠 레이어에 적용된다.

### BackLink
상세(자식) 페이지 상단 뒤로가기 표준. `text-xs text-ink-faint` 문단 안 `← {부모 섹션명}` 링크(`brand-underline brand-ring`). `min-h-6`으로 텍스트는 text-xs를 유지하면서 터치 타깃 24px 확보. 모든 상세 페이지의 **첫 요소**로 쓰고, 다음 블록은 `mt-3`.

### Card (구획 블록 — 박스 아님)
`block border-t border-line py-5` — 상단 헤어라인 룰 + 세로 패딩으로만 구획(v0.4.0, 사면 박스 금지). `href` 주면 전체 링크 + `hover:bg-brand-hover`(브랜드 틴트 — 회색 호버 금지) + `brand-ring`(§9 포커스 의무). 구성: eyebrow(선택) → title(`text-lg font-semibold`) → description(`text-sm text-ink-muted`) → children. 목록·그리드는 Card를 나열하면 행마다 룰이 생겨 gov.uk식 리스트가 된다.

### Button / ButtonLink
- variant: **solid**(`bg-ink text-surface hover:bg-ink/80`) · **ghost**(`bg-surface-subtle hover:bg-brand-hover` — v0.4.0부터 테두리 없는 면, gov.uk secondary 문법). 2종 외 금지.
- size: **md**(`h-10 px-4 text-sm`) · **sm**(`h-8 px-3 text-xs`).
- 공통: `font-medium transition-colors brand-ring`(직각), disabled=`opacity-40`+포인터 차단.
- 링크가 버튼처럼 보여야 하면 ButtonLink(기본 ghost).

### Input / Textarea
`border-2 border-ink bg-transparent px-3 py-2 text-sm placeholder:text-ink-faint brand-ring`(직각 — **굵은 잉크 테두리는 "입력하는 곳"이라는 기능 신호**, gov.uk 문법. v0.4.0). 라벨은 `text-xs font-medium text-ink-muted` + `gap-2`.

상태: disabled=`opacity-40`(버튼과 동일 문법) · 에러=폼 에러 문구(아래)+`aria-invalid`(테두리 색 변형 없음 — 의미 색 금지 §1-4) · 포커스=brand-ring. readonly는 현재 미사용 — 도입 시 이 절에 스펙 추가가 선행 조건.

**폼 에러 문구**: `text-sm font-medium text-ink` + `role="alert"`. 의미 색(빨강 등) 금지 — 상태는 텍스트로 말한다(§1-4). 강조는 색이 아니라 굵기(font-medium)로.

### Badge
`bg-surface-subtle px-2 py-0.5 text-xs text-ink-muted`(직각 — 알약형 금지). 의미 색(빨강·노랑 등) 변형 금지 — 상태는 텍스트로 말한다.

### base.css
`color-scheme: light` 강제 · `::selection` 브랜드 틴트 · **폼 컨트롤 직각 강제**(브라우저 기본 라운딩 제거 — Safari search 입력 포함) · `.brand-ring`(포커스: surface 갭 → **ink 고대비 링**(주 표시) → brand halo(보조)) · `.brand-underline`(텍스트 링크 표준: 브랜드색 얇은 밑줄, offset 3px).

**텍스트 링크 규칙**: 본문 속 링크는 `.brand-underline` 하나로 통일. `underline` 단독 사용 금지.

### prose.css (긴 글 영역)
`@tailwindcss/typography` 플러그인을 쓰는 소비처 전용 토큰 글루(v0.2.0). `tokens.css`·`base.css` 다음에 import.
- 플러그인의 gray 팔레트 변수(`--tw-prose-*`) 전체를 시맨틱 토큰으로 강제(body/headings=ink · counters/bullets/captions=ink-faint · hr/borders=line · pre 배경=surface-subtle).
- 제목 크기·굵기를 6단 스케일로 정렬(§4), 링크는 brand-underline과 동일 시각, 코드 블록 라운딩 제거(직각).
- `max-width: none` — 폭은 PageShell이 유일하게 결정(§5). `prose-invert`·`prose-neutral` 등 플러그인 변형 클래스 사용 금지.

## 7. 차트·데이터 시각화

- 팔레트는 UI와 **격리**: `dist/chart-palette.ts`를 앱에 복사(`lib/design/chart-palette.ts`). UI에 차트 색 금지, 차트에 brand 금지.
- `FAMILY_COLORS`(AI 모델 패밀리 11색) · `HEATMAP_LEVELS`(5단계, GitHub 그린 — 브랜드 그린 미사용: 대비 미달 결정) · `TOKEN_COMPOSITION`(4색) · `CHART_AXIS`(grid `rgba(0,0,0,.06)` · tick `rgba(0,0,0,.55)`). 히트맵 셀·범례 스와치는 직각(v0.3.0).
- 축·그리드·툴팁에 인라인 hex 금지 — `CHART_AXIS` 사용.
- 접근성: 범례·툴팁·표로 수치 병행(그래픽 정보 대비 기준 3:1, 색 단독 전달 금지).

## 8. 모션

`transition-colors`(기본 150ms) **하나만**. 이동·확대·페이드 등 장식 애니메이션 금지. `duration-*` 클래스 직접 지정 금지. `transition-opacity` 등 다른 transition도 금지 — 호버 피드백은 색으로(`hover:text-ink-muted` 등).

공식 예외: 로딩 스켈레톤의 `animate-pulse` — 장식이 아니라 로딩 상태 피드백(그 외 keyframe 애니메이션 금지).

## 9. 접근성 기준

- 텍스트 대비 ≥4.5:1 (토큰이 보장 — `ink-faint`가 하한), 그래픽 ≥3:1.
- 모든 인터랙티브 요소에 `brand-ring`(포커스 가시성) — 프리미티브가 내장, 커스텀 요소도 의무. 포커스 주 표시는 ink 고대비 링(≥3:1), **brand 단독 포커스 링 금지**(대비 1.36:1 미달).
- 터치/클릭 타깃: 버튼 md 40px 기준(sm은 보조 액션 한정).
- 색 단독 정보 전달 금지(§1-4).

## 10. 브랜드 위계

- **sidoyu** = 메인 브랜드(사이트 전체). 로고타입은 `font-bold` 텍스트 "sidoyu".
- **YUNSFEED** = 뉴스레터 서브브랜드. 뉴스레터 영역 명칭에만 사용하고 **토큰은 전부 공유**(별도 색·폰트 없음).

## 11. 새 프로젝트 적용 절차 (5단계)

1. `dist/tokens.css` + `registry/ui/base.css`를 프로젝트에 복사(또는 raw URL — **버전 태그 고정**, `main` 추적 금지), globals.css에서 `@import "tailwindcss";` 다음에 import. `@tailwindcss/typography`를 쓰면 `registry/ui/prose.css`도 함께(§6).
2. Geist 폰트 연결: next/font로 Geist·Geist_Mono 로딩 후 `@theme { --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif; --font-mono: var(--font-geist-mono), ui-monospace, monospace; }` glue 추가.
3. 필요한 프리미티브를 `registry/ui/`에서 `components/ui/`로 복사(차트 쓰면 `chart-palette.ts`도 `lib/design/`에).
4. `scripts/design-check.sh` 복사 + package.json에 `"design:check": "bash scripts/design-check.sh"` 추가. 의도적 예외는 `.design-check.allow`에 사유 주석과 함께.
5. 첫 페이지를 PageShell로 작성하고 `npm run design:check` 통과 확인.

> 비 Tailwind 환경(확장 팝업 등)은 `dist/tokens.flat.json`에서 필요한 값만 CSS 변수로 옮긴다.

## 12. 금지 패턴

> `design-check.sh`는 아래 중 정규식으로 잡히는 것만 검사하는 **보조 안전망(부분 검사)**이다. 권위는 이 문서 전체.

| 패턴 | 대신 |
|---|---|
| `dark:*` | 없음 — 라이트 전용 |
| className 인라인 hex | 색 토큰 |
| `text/border/bg-black/N`, `white/N` | `ink-muted` `ink-faint` `line` `surface-subtle` |
| `rounded*` 전부·`border-radius` | 없음 — 직각 모서리(§1-3-1) |
| `shadow-*`·`backdrop-*` | 없음 — 플랫(포커스 링 box-shadow는 base.css 내부만) |
| `border border-line` 사면 박스 | 구획은 수평선·여백(§1-3-2). 기능 테두리만 예외(`.design-check.allow`에 사유) |
| `max-w-md/3xl/5xl` 등 | PageShell(`max-w-wide/reading/narrow`) |
| `text-4xl` 이상 | 스케일 6단 안에서 해결 |
| 단독 `underline` | `.brand-underline` |
| `duration-N` 직접 지정 | `transition-colors`(기본 150ms) |
| `text-brand` · `bg-brand`(면) | brand는 포인트 전용(§1-2) |
| 임의값: `text-[..]` `p*/m*-[..]` `gap-[..]` | 스케일 6단·4px 간격 스케일 (차트 내부 값은 chart-palette 상수) |
| Tailwind 팔레트 색 (`red-600` `gray-500` 등) | 시맨틱 토큰 — 차트 데이터 색은 chart-palette |
| 카드/버튼/입력 인라인 재구현 | 프리미티브 사용 |

공식 예외: `hover:bg-ink/80`은 Button solid의 내부 구현 전용(페이지 코드에서 직접 사용 금지).

## 13. 의도적 제외 + 재검토 트리거

| 제외 | 이유 | 재검토 트리거 |
|---|---|---|
| 다크모드 | 1인 운영 부담 2배, 카카오 인앱 대응 | 사용자(본인) 재결정 시 |
| 모서리 라운딩 | 직각·플랫 정체성 — 둥근 카드='AI 생성물' 인상(2026-06-11 사용자 결정, radius 토큰 삭제) | 사용자(본인) 재결정 시 |
| 그림자 토큰 | 시각 언어가 테두리 중심. 장식 그림자 금지(단, 포커스 링 구현용 `box-shadow`는 예외) | 떠 있는 레이어(모달 등) 도입 시 |
| z-index 토큰 | 겹치는 레이어 없음 | 모달/토스트/고정 헤더 2개 이상 시 |
| shadcn/radix | 복합 인터랙션 없음 | 모달·드롭다운·콤보박스 필요 시 |
| npm 패키지 배포 | 소비처 1~2개, 복사가 단순 | 런타임 공유가 필요한 프로젝트 3개 이상 시 |
| Figma 양방향 동기화 | 1인 운영 부채 | 디자이너 협업 시작 시 |
| Storybook | `/design` 페이지로 대체 | 외부 기여자 생길 시 |

## 14. Figma 미러 규정

- 코드(`tokens.json`)가 원본, **Figma는 읽기 전용 미러**(시안 작업용). Figma에서 직접 수정 금지 — 수정하고 싶은 값은 tokens.json을 고치고 재생성.
- 생성: `dist/tokens.flat.json` 기반으로 Figma Variables(색·radius·spacing)·타입 스타일·프리미티브 프레임 생성(Phase 4, Figma MCP).
- 라이브러리 첫 페이지에 의무 표기: source repo · 버전 · 생성일. 매핑은 `figma/figma-manifest.json`에 보관.

## 15. 변경 관리

- semver-lite(§CHANGELOG.md). 소비처는 **버전 태그 고정**.
- 토큰·컴포넌트를 바꾸면: ① tokens.json/소스 수정 ② `npm run build` ③ CHANGELOG 기록 ④ 소비 프로젝트는 각자 버전업 시점에 마이그레이션 메모를 보고 갱신.
- 새 토큰/variant 추가 전 자문: "기존 토큰·크기·위계로 해결되지 않는가?" — 대부분 해결된다.
