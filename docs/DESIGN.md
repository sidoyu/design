# sidoyu design system — DESIGN.md

> 단일 권위 스펙. 코드·Figma·문서가 충돌하면 **`tokens/tokens.json` + 이 문서**가 이긴다.
> 둘 사이의 권한 분리: **값 = tokens.json · 의미·사용 규칙 = 이 문서.** 값이 어긋나면 tokens.json이, 용도·금지가 어긋나면 이 문서가 정본이다.
> 버전: v0.6.1 (2026-10-29) · 변경 이력은 `CHANGELOG.md`
> **모양의 정본 = `registry/ui/base.css` 의 `sd-*` 클래스**(v0.6.0). React 부품은 이 클래스를 입히는 껍데기이고, 일반 CSS·생성 HTML 소비처도 같은 클래스를 쓴다(§17).

---

## 1. 정체성과 원칙

**흰 바탕 + 검정 잉크 + 네온 그린 포인트.** Geist 타이포그래피, **직각 모서리, 박스 없음** — 구획은 수평선·여백·타이포그래피로(gov.uk 문법). 플랫, 장식 없음. 기능적인 웹.

1. **라이트 전용.** 다크모드는 만들지 않는다. `dark:` 클래스 금지. 시스템 다크모드도 무시한다(`color-scheme: light`) — 카카오 인앱 브라우저 등에서 강제 반전을 막기 위한 의도적 결정.
2. **네온 그린(#28FF35)은 정체성 포인트다.** 허용: 텍스트 링크 밑줄·포커스 링 바깥 테·호버 틴트·텍스트 선택영역(끌어 선택한 글자). 금지: 면 배경·글자 색·**선택된 항목 표시·역할 구분·상태 표시**. 이유는 정체성(한 화면에 액센트 하나)이다 — 잉크 면 위에서 15.45:1 이어도 네온 글자를 쓰지 않는다. 흰 배경 1.36:1 은 글자 금지의 추가 이유다.
3. **시맨틱 토큰 우선.** raw 색·임의 투명도 직접 사용 금지. 토큰에 없는 값이 필요하면 먼저 토큰을 추가한다(이 문서와 함께).
3-1. **모서리는 직각.** 라운딩 전면 금지(`rounded*`·`border-radius` — radius 토큰은 v0.3.0에서 삭제). 그림자·블러도 금지(포커스 링 box-shadow만 예외). 2026-06-11 결정: 둥근 카드가 'AI 생성물' 인상을 줌 — 플랫·샤프로 전환.
3-2. **박스 금지(v0.4.0).** 콘텐츠를 사면 테두리 상자에 담지 않는다. 구획은 **수평선(`border-t/b border-line`)·여백·타이포 위계**로만. 테두리는 기능이 요구하는 곳에만: 입력창 `border-2 border-ink`(입력 영역 식별), 표 머리·몸 경계(잉크 1px)와 행 구분선. 면(`bg-surface-subtle`)은 버튼·배지·코드 같은 작은 기능 요소에만 — 넓은 콘텐츠 면 금지(표 헤더도 면 없음, v0.6.0). 2026-06-11 결정: gov.uk식 기능 우선("박스도 장식이다").
4. **색 단독으로 정보를 전달하지 않는다.** 차트·상태 표시는 텍스트·수치 병행. 구분 기능을 맡는 선·면(선택·현재 위치·머리와 몸의 경계·상태)은 잉크 계열(흰 배경 3:1 이상) 또는 상태색으로 그린다. `line`·`surface-subtle` 은 구획 전용이고 뜻을 싣지 않는다(v0.6.0).
5. **과토큰화 회피.** 간격은 Tailwind 기본 4px 스케일을 그대로 쓰고, 페이지 표준은 PageShell이 강제한다. 그림자·z-index·애니메이션 토큰은 의도적으로 없다(§13).

## 2. 지원 범위

| 구분 | 대상 |
|---|---|
| **Current** | 웹(Next.js+Tailwind 4), PWA, Chrome 확장 팝업(토큰만), 게임 UI 크롬(토큰만), 트랜잭션 이메일(색·타이포 토큰만 — hover·포커스 링·유틸리티 클래스 규정은 적용 대상 아님) |
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

원본: `tokens/tokens.json` → 발행: `dist/tokens.css`(Tailwind `@theme`) · `dist/tokens.vars.css`(일반 CSS 용 `:root` 변수 — 이름·값이 같다) · `dist/base.css`(모양 정본 + 버전 도장). 유틸리티 예: `bg-brand-hover` `text-ink-muted` `border-line`.

대비 = (L밝은 + 0.05) / (L어두운 + 0.05), L = WCAG 2 상대 휘도, 투명 토큰은 흰 배경에 합성해 계산한다.

| 토큰 | 값 | 용도 | 금지 |
|---|---|---|---|
| `brand` | `#28FF35` | 정체성 포인트: 텍스트 링크 밑줄·포커스 링 바깥 테·호버 틴트·텍스트 선택영역 | 면·글자·선택된 항목·역할·상태 표시 |
| `brand-hover` | `rgba(40,255,53,.12)` | 인터랙티브 호버 배경 | 정적 요소에 사용 |
| `brand-selection` | `rgba(40,255,53,.22)` | `::selection` 전용 | 그 외 전부 |
| `ink` | `#000` | 제목·본문·solid 버튼 배경·선택 표시·입력 테두리 | — |
| `ink-muted` | `rgba(0,0,0,.70)` | 보조 본문·설명 (흰 배경 8.52:1) | — |
| `ink-faint` | `rgba(0,0,0,.55)` | 메타·라벨·날짜 (흰 배경 4.76:1 — 글자 하한) | **이보다 옅은 텍스트 금지** |
| `surface` | `#FFF` | 페이지 배경(구획 블록은 투명) | — |
| `surface-subtle` | `rgba(0,0,0,.03)` | ghost 버튼·배지·코드 면 (흰 배경 1.07:1) | 뜻(상태·선택)을 싣는 것 |
| `line` | `rgba(0,0,0,.10)` | 구획선 전용 (흰 배경 1.25:1 — 입력 테두리는 `ink`) | 뜻을 싣는 것 · 임의 투명도 변형 |
| `error` | `#B3261E` | 오류·실패 — 글자·가는 선·작은 표지 (흰 6.54 · `surface-subtle` 위 6.12 · `brand-hover` 위 6.16) | 면 · 차트 |
| `attention` | `#B45309` | 살펴볼 것 있음·판정 불가 — 글자·가는 선·작은 표지 (흰 5.02 · 4.70 · 4.73) | 면 · 차트 |

상태색 두 개는 적록 색약 근사에서 거의 같은 색으로 보인다. 그래서 상태는 색에 기대지 않고 문구(「실패」/「점검 필요」)와 표지 모양(채운 사각/빈 사각)으로 가른다(§16). 성공·정보에는 색을 주지 않는다(§13). `attention` 이라는 이름은 GitHub Primer 에서 빌렸지만, "판정 불가"를 여기에 넣는 것은 sidoyu 자체 결정이다.

마이그레이션 매핑: `black/70·/60→ink-muted`, `black/50·/45·/40→ink-faint`, `black/10·/15·/20(테두리)→line`, `black/[.03]·/5(배경)→surface-subtle`. 더 보조적인 텍스트가 필요하면 색을 더 옅게 하지 말고 **크기·위치·간격**으로 위계를 만든다.

## 4. 타이포그래피

- 폰트: **Geist**(본문·제목), **Geist Mono**(코드·표 숫자, `tabular-nums` 병용). next/font로 로딩하고 앱 glue에서 연결(§11).
- 한글 폴백: `Geist → Apple SD Gothic Neo → Noto Sans KR → ui-sans-serif, system-ui`(v0.6.0).
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
- 인셋 텍스트: 보조 주석 블록은 `.sd-callout`(좌측 2px `line` + `pl-3` — gov.uk inset text 문법, 사면 박스 금지(§1-3-2)의 대체. 변형은 §6).
- 그리드: wide 페이지는 `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`.

### 5-1. 작업 화면 배치 (v0.6.0)

- 문서형 페이지는 PageShell 을 쓴다. 작업 화면(사이드바·고정 입력창이 있는 화면)은 전체 폭을 쓰고, 본문 줄 길이만 `reading` 상한을 지킨다. 새 폭 토큰·AppShell 부품은 만들지 않는다.
- 머리글: 제품명은 왼쪽, 상대 제품으로 가는 링크는 오른쪽 끝에 둔다.
- 머리글은 화면 가장자리를 기준으로 놓고, 본문 열(`reading` 상한)의 끝과 맞추지 않는다 — 넓은 화면에서 머리글 오른쪽 끝과 입력창 오른쪽 끝이 다른 것은 규칙대로다. 좁은 화면(48rem 미만)에서는 머리글과 본문이 같은 좌우 여백을 쓴다(v0.6.1).
- 좁은 화면 경계는 **48rem 하나**다(이보다 좁으면 사이드바 → 서랍).
- 겹침 층은 고정값 3층으로 쓴다: 고정 머리글·표 머리 = 10 · 스크림 = 20 · 서랍·패널 = 30. 스크림 = 잉크 20%.
- 부품 반응형은 줄바꿈(flex-wrap)을 우선한다. 컨테이너 쿼리는 폭이 정해진 자리에서만 쓴다 — `container-type` 은 폭이 내용으로 정해지는 자리에서 폭을 0 으로 접는다.

## 6. 컴포넌트 스펙 (모양 정본 = base.css · React 껍데기 8종)

모양의 정본은 `registry/ui/base.css` 의 `sd-*` 클래스다(v0.6.0). React 부품은 클래스를 입히는 껍데기(8종)이고 모양을 tsx 에 다시 적지 않는다. **클래스·variant 추가는 이 문서 갱신이 선행 조건**이다 — 페이지별 예외를 부품이 흡수하기 시작하면 시스템이 무너진다.

8종 = PageShell · BackLink · Card · Button(ButtonLink는 Button의 링크형이라 별도로 세지 않음) · Input · Textarea · Badge · Segmented — **export 컴포넌트 단위**로 센다. `base.css`·`prose.css`는 스타일 계층이지 프리미티브가 아니다. React 껍데기가 없는 규격(상태 표기·표·접이식 등)은 아래 "CSS 규격" 절에 있고, 클래스를 마크업에 직접 쓴다.

**경계 규칙**: 부품의 시각 선언(색·테두리·padding·포커스)은 base.css 만 갖는다. 소비처 CSS 와 className 은 배치 선언(폭·위치·최대 높이·간격)만 둔다.

### PageShell (`.sd-page` · `.sd-measure-reading` · `.sd-measure-narrow`)
모든 페이지의 루트. `width="wide|reading|narrow"`(기본 reading). §5 값 강제.
**2층 구조(v0.5.0)**: 바깥 `<main class="sd-page">`는 항상 wide 중앙 배치(패딩 상 24px · 좌우 24px · 하 56px), 안쪽 div가 `reading`/`narrow` 상한을 왼쪽 정렬로 적용 — 모든 본문이 헤더와 같은 왼쪽 기준선에서 시작(§5). `className`은 바깥 `<main>`이 아니라 안쪽 콘텐츠 레이어에 적용된다.

### BackLink
상세(자식) 페이지 상단 뒤로가기 표준. `text-xs text-ink-faint` 문단 안 `← {부모 섹션명}` 링크(`sd-target brand-underline brand-ring`). `.sd-target`이 텍스트는 text-xs를 유지하면서 터치 타깃 24×24px 구조를 보장한다(v0.5.2). 모든 상세 페이지의 **첫 요소**로 쓰고, 다음 블록은 `mt-3`.

### Card (`.sd-block` · `.sd-block-link` — 구획 블록, 박스 아님)
상단 헤어라인(`line` 1px) + 세로 패딩 20px 으로만 구획(v0.4.0, 사면 박스 금지). `href` 주면 전체 링크(`.sd-block-link`) + 브랜드 호버 틴트(회색 호버 금지) + 내장 포커스 링. 링크 카드의 호버 틴트는 **좌우 8px 확장**(텍스트 기준선은 유지, 틴트만 번짐 — 표준 그리드 `gap-4`에서 인접 카드와 겹치지 않는 상한. v0.5.1). 구성: eyebrow(`.sd-eyebrow`, 선택) → title(`text-lg font-semibold`) → description(`text-sm text-ink-muted`) → children. 목록·그리드는 Card를 나열하면 행마다 룰이 생겨 gov.uk식 리스트가 된다.

### Button / ButtonLink (`.sd-btn` · `--ghost` · `--sm` · `--icon`)
- variant: **solid**(잉크 면 + 흰 글자, 호버 = 잉크 80%) · **ghost**(`surface-subtle` 면, 호버 = 브랜드 틴트 — 테두리 없는 면, gov.uk secondary 문법). 2종 외 금지.
- size: **md**(높이 40px · 좌우 16px · `text-sm`) · **sm**(32px · 12px · `text-xs`).
- **icon**(v0.6.0): 아이콘 전용 정사각(md 40 · sm 32). 보이는 글자가 없으므로 **`aria-label` 필수**(React 는 타입으로 강제). 아이콘 규격은 아래 "아이콘".
- 공통: `font-medium`·색 전환·내장 포커스 링(직각). 투명 1px 테두리를 갖는다(강제 색상 모드에서 면이 시스템 색이 되어도 버튼 경계가 남는다).
- **비활성은 네이티브 `disabled` 만** 흐리게 한다(`opacity-40` + 포인터 차단). `aria-disabled` 를 쓰면 키보드 실행 차단은 소비처 스크립트가 맡는다.
- 링크가 버튼처럼 보여야 하면 ButtonLink(기본 ghost).
- 버튼 묶음은 `.sd-actions`(가로 줄바꿈, 간격 8px).

### Input / Textarea (`.sd-field`)
굵은 잉크 2px 테두리 · 투명 배경 · 패딩 8px/12px · `text-sm` · placeholder `ink-faint` · 내장 포커스 링(직각 — **굵은 잉크 테두리는 "입력하는 곳"이라는 기능 신호**, gov.uk 문법. v0.4.0). Textarea 는 최소 높이 112px · 세로 크기 조절. 셀렉트는 `select.sd-field`(직각 화살표를 그리고, 강제 색상 모드에서는 네이티브 화살표로 되돌린다). 라벨은 `.sd-label`(`text-xs font-medium text-ink-muted`) + `gap-2`.

상태: disabled = `opacity-40`(버튼과 동일 문법) · **에러 = `aria-invalid="true"` → 테두리만 `error`**(v0.6.0) · 포커스 = 내장 링. readonly는 현재 미사용 — 도입 시 이 절에 스펙 추가가 선행 조건.

**칸 오류 문구(`.sd-error-msg`)**: `text-sm font-medium` + `error` 글자. 마크업 앞에 `<span class="sd-vh">오류:</span>` 를 붙이고(화면에는 숨고 화면낭독기에는 읽힌다), 문구의 `id` 를 해당 입력의 `aria-describedby` 로 연결한다 — 어느 입력의 오류인지가 계약의 일부다(v0.5.1). 오류가 나도 입력값은 지우지 않는다. 제출 시 오류가 여럿이면 아래 "인셋 안내"의 오류 요약을 쓴다.

### Badge (`.sd-badge`)
**분류 꼬리표 전용.** `surface-subtle` 면 · 패딩 2px/8px · `text-xs text-ink-muted`(직각 — 알약형 금지). 상태(실패·주의 등)를 말하지 않는다 — 상태는 아래 "상태 표기"(v0.6.0).

### Segmented (`.sd-tabs` + `.sd-tab` · v0.6.0)
값 하나를 고르는 토글 버튼 묶음(`aria-pressed`). **그룹 라벨 필수**(`label`) — 앞 제목이 맥락을 주는 자리에서만 `hideLabel` 로 화면에서 숨긴다(화면낭독기에는 읽힌다). 모양은 아래 "탭·세그먼트". 선택지는 5~7개 상한.

### CSS 규격 (v0.6.0 — React 껍데기 없이 클래스를 직접 쓴다)

**상태 표기(`.sd-status` · `--error` · `--attention`)** — 뜻 이름 글자가 주인이고 색·표지는 보조다.
- 기본(표지 없음) = 정상·진행·완료·업무 상태, `ink-muted`.
- `--error` = 오류·실패: `error` 글자 + 굵게 + 채운 8px 사각.
- `--attention` = 살펴볼 것·판정 불가: `attention` 글자 + 굵게 + 빈 8px 사각(2px 테).
- 표지는 `border` 로 그린다(강제 색상 모드에서도 남는다). 면으로 상태를 칠하지 않는다. 공통 부품은 상태를 추론하지 않는다 — 소비처가 뜻을 정해 넘긴다.

**인셋 안내(`.sd-callout` · `--strong` · `--error` · `--attention`)** — 좌측 2px 선 + 왼쪽 들여쓰기 12px. 기본 = `line`(보조 주석) · `--strong` = 잉크(꼭 읽을 안내·제자리 확인) · `--error`·`--attention`.
- **`--error`·`--attention` 은 첫 줄에 같은 뜻의 `.sd-status` 문구를 둔다**(선 색만으로 갈리지 않게 — WCAG 1.4.1).
- 오류 요약 = `--error` 안에 고정 제목 「확인할 것이 있습니다」 + 오류 칸으로 가는 링크 목록, `role="alert"`. 나타날 때 제목(`tabindex="-1"`)으로 포커스를 옮긴다. 사면 박스 금지.

**표(`.sd-table` · `.sd-table-wrap` · `.sd-num` · `.sd-row--idle`)**
- 넓은 표는 `.sd-table-wrap`(가로 스크롤 상자) 안에 둔다. 상자에 `tabindex="0"` + `role="region"` + `aria-label` 을 준다. 좁은 화면 전략은 이것 하나다.
- 헤더 면 없음: `thead th` = `font-medium` · `ink-muted` · 아래 **잉크 1px**(머리·몸 경계) · 행 = `line` 1px.
- 머리 규칙은 `thead` 안의 `th` 에만 걸린다(v0.6.1). 몸통의 행 머리 `th` 는 `td` 와 같은 칸(행 `line` 1px)이고 `font-medium` 왼쪽 정렬만 갖는다 — 그 안의 단추는 정렬 단추 초기화를 받지 않는다.
- `.sd-num` = 오른쪽 정렬 + `tabular-nums` · 모르는 값은 「—」.
- 정렬 = `thead th` 안 `<button>`(높이 24px 이상) + `th` 의 `aria-sort`(화살표는 보조).
- 업무상 유휴 행 = `.sd-row--idle`(`ink-muted`). 비활성 컨트롤이 아니므로 opacity·`ink-faint` 로 흐리지 않는다.
- 고정 머리(sticky)를 쓰면 `th` 배경을 불투명한 `surface` 로 둔다(아래 행이 비쳐 겹치지 않게). `.sd-table-wrap` 은 `overflow-x: auto` 때문에 세로로도 스크롤 상자가 되어 sticky 기준이 화면에서 상자로 바뀐다 → 고정 머리를 쓰는 표는 상자에 높이를 정해 세로 스크롤도 상자가 갖게 하거나(예: `max-height: calc(100dvh - 머리글 높이)`), 가로 넘침이 없는 표면 상자를 쓰지 않는다.

**접이식(`.sd-details`)** — 네이티브 `<details>`/`<summary>`. 좌측 2px `line` + 머리줄 `text-xs ink-muted` + `›`/`⌄`.
- 머리줄 문구가 안의 상태를 요약한다(「도구 3개 실행 · 1개 실패」).
- **안에 실패가 있으면 머리줄의 그 조각을 `.sd-status--error` 로 쓴다**(닫힌 머리줄에서 실패가 정상과 같은 무게로 묻히지 않게). 펼칠지는 실패의 성격으로 정한다(v0.6.1):
  - **결과인 실패**(그 실패로 일이 끝남 — 마지막 단계가 실패, 또는 전체가 실패) = 기본으로 펼친다(`open`). 전체가 실패면 접이식 밖에 `.sd-callout--error` 로도 알린다.
  - **과정인 실패**(뒤에 다른 시도가 이어짐) = 머리줄의 「실패」 표시만 두고 접어 둔다.
  - 판정은 일어난 사실(뒤에 단계가 이어졌는가)로만 한다. "복구됨"을 추론해 표시하지 않는다(§16-4).
- 머리줄 안의 `.sd-status` 는 한 줄로 고정된다(`flex: none` · `white-space: nowrap`, v0.6.1 — 한글은 음절마다 줄바꿈이 허용되어 줄어드는 칸에 두면 「실/패」로 쪼개진다). 줄어드는 칸은 하나(인자·경로 등)만 두고 그 칸에 `min-width: 0` 과 말줄임을 준다. 순서 = 이름 · 상태 · 인자.
- `summary` 에 `aria-label` 을 달지 않는다(안의 문구를 가린다).

**목록 행(`.sd-list` · `.sd-list-item`)** — 선택 가능한 행. `<a>`·`<button>` 모두 쓸 수 있다(버튼 초기화 내장: 테두리·배경 없음, 폭 100%, 왼쪽 정렬, 글꼴 상속). 제목 `text-sm` + 메타 `.sd-meta` · 호버 `brand-hover` · 선택 = `aria-current` → 잉크 좌측 2px + 굵게. Card(구획 블록)와 다르다.

**탭·세그먼트(`.sd-tabs` · `.sd-tab`)** — 같은 모양. 선택 = `aria-selected`/`aria-pressed`/`aria-current` → 잉크 2px 밑줄(묶음의 `line` 1px 위에 겹침) + 굵게. 브랜드로 선택을 표시하지 않는다. `.sd-tab` 은 언제나 `.sd-tabs` 안에 둔다.
- 탭 = 내용 전환. `role="tablist"` + 방향키 동작을 소비처가 소유한다.
- 세그먼트 = 값 선택. `aria-pressed` 단추 묶음 + 그룹 라벨 의무(React `Segmented`).
- 5~7개 상한.

**복합 입력(`.sd-composer`)** — 입력창 + 도구줄. 바깥 2px 잉크 테두리. **바깥 묶음은 포커스 링을 받지 않는다**(v0.6.1 — 포커스 링 내장 원칙의 유일한 예외): textarea 의 글자 커서가 포커스 표시이고, 굵은 잉크 테두리가 이미 "입력하는 곳"을 알린다(claude.ai·chatgpt.com 의 입력창과 같은 문법). 안쪽 textarea 는 테두리·outline 이 없고 `caret-color` 를 바꾸지 않는다. 안쪽 버튼은 각자 `:focus-visible` 링을 갖는다. 도구줄 = 안쪽 `.sd-actions`. 접근성 근거는 §9.

**코드(`.sd-code`, v0.6.1)** — 인라인 `<code>` 와 블록 `<pre>` 에 같은 클래스를 쓴다. 면 = `surface-subtle`, 직각, 고정폭 글꼴(`--font-mono`, 없으면 시스템 고정폭). 블록은 줄을 바꾸지 않고 상자 안에서 가로로 스크롤한다 — 키보드로도 스크롤할 수 있게 블록에 `tabindex="0"` + `role="region"` + `aria-label`(예: 「코드」, 언어를 알면 「코드 · python」)을 준다(표 스크롤 상자와 같은 규격, 링 내장. 넘침을 감지해 붙였다 뗐다 하지 않는다). 블록 안의 `<code>` 는 면·여백을 다시 갖지 않는다. 복사 단추는 블록 바로 위나 아래의 `.sd-actions` 안에 `.sd-btn--ghost.sd-btn--sm` 으로 둔다(코드 위에 겹쳐 띄우지 않는다).

**읽기판(`.sd-readout`)** — `<dl>` 안 `<div>` 행마다 `dt`(`ink-muted`, 7rem)·`dd`(잉크), 행 아래 `line` 1px. 폭이 모자라면 값이 라벨 아래로 내려간다(flex-wrap). KPI 숫자에 브랜드 밑줄을 쓰지 않는다.

**폼 컨트롤** — 체크박스·라디오·슬라이더·`progress` = 네이티브 + `accent-color: ink`. 체크·라디오는 공통 포커스 링을 내장한다(슬라이더는 손잡이 링을 소비처가 그리므로 공통 링에서 뺀다). 셀렉트 = `select.sd-field`. 라벨을 포함한 클릭 영역은 24px 이상.

**아이콘(`.sd-icon`)** — 크기 16/20px · 획 1.75 · 획 끝·이음 직각(`stroke-linecap: square` · `stroke-linejoin: miter`) · 장식이면 `aria-hidden`. 아이콘 세트는 채택하지 않는다(§13).

**보조 클래스** — `.sd-meta`(`text-xs ink-faint` 메타) · `.sd-eyebrow` · `.sd-label` · `.sd-target`(홀로 선 링크·작은 컨트롤의 24×24 타깃) · `.sd-vh`(화면에 숨기고 화면낭독기에 읽힘) · `.sd-actions`(버튼 묶음).

### 행동 패턴 (클래스 조합 — 새 클래스 없음)

- **진행 표시** — 「{동사} 중…」 문구에 `role="status"` 를 주되, **초마다 바뀌는 경과초는 live region 밖에 둔다**. 화면낭독기에는 시작·완료·실패만 알린다.
- **제자리 확인**(모달 없음) — `.sd-callout--strong` + `.sd-actions`. 확인 구획이 열리면 질문 문장(`tabindex="-1"`)으로 포커스를 옮기고, 취소·완료하면 원래 버튼으로 되돌린다. 실행 중 반복 실행을 막는다. 흐름 안 결과 문구에는 `role="status"`.
- **대화 본문(에이전트·모델이 쓴 마크다운)**(v0.6.1) — 새 클래스 없이 기존 규격에 대응시킨다: 표 → `.sd-table-wrap` + `.sd-table` · 인용 → `.sd-callout` · 링크 → `.brand-underline` · 코드 → `.sd-code` · 접이식 → `.sd-details`. 원시 HTML 은 해석하지 않고 글자로 보인다. 역할 구분은 §16-8.
- **파괴적 행동** — 실행 버튼은 언제나 잉크(solid). 라벨 = 동사 + 대상(+수량). 되돌릴 수 있으면 색 없음. 되돌릴 수 없으면 확인 구획을 `.sd-callout--error` 로 열고 첫 줄에 「되돌릴 수 없습니다」(`.sd-status--error`). 빨강 버튼 면은 쓰지 않는다.

### base.css
`color-scheme: light` 강제 · `::selection` 브랜드 틴트 · **폼 컨트롤 직각 강제**(브라우저 기본 라운딩 제거 — Safari search 입력 포함) · 네이티브 컨트롤 `accent-color: ink` · `.brand-ring`(포커스: surface 갭 → **ink 고대비 링**(주 표시) → brand halo(보조), outline 은 투명으로 남겨 강제 색상 모드에서 보이게) · `.brand-underline`(텍스트 링크 표준: 브랜드색 밑줄, 두께 `from-font`, offset 3px) · 위의 `sd-*` 클래스 전부. **레이어로 감싸지 않는다** — 가져오는 방법은 §17.

포커스 링을 내장한 것은 조작 클래스뿐이다: `sd-btn`·`sd-field`·`sd-tab`·`sd-list-item`·`sd-details > summary`·`sd-block-link`·표 정렬 단추·`sd-table-wrap`(키보드 스크롤 상자)·`pre.sd-code`(넘치는 코드 블록)·`.prose` 본문 링크·체크박스·라디오. `sd-composer` 바깥 묶음은 링을 받지 않는다(위 복합 입력, v0.6.1). 이들에는 `brand-ring` 을 따로 붙이지 않는다. 보조 클래스(`sd-target` 등)와 그 밖의 커스텀 인터랙티브 요소에는 `brand-ring` 을 함께 쓴다(예: BackLink = `sd-target brand-underline brand-ring`).

**텍스트 링크 규칙**: 본문 속 링크는 `.brand-underline` 하나로 통일. `underline` 단독 사용 금지. 문장 밖에 홀로 선 링크는 `.sd-target` 을 함께 쓴다.

### prose.css (긴 글 영역)
`@tailwindcss/typography` 플러그인을 쓰는 소비처 전용 토큰 글루(v0.2.0). `tokens.css`·`base.css` 다음에 import.
- 플러그인의 gray 팔레트 변수(`--tw-prose-*`) 전체를 시맨틱 토큰으로 강제(body/headings=ink · counters/bullets/captions=ink-faint · hr/borders=line · pre 배경=surface-subtle).
- 제목 크기·굵기를 6단 스케일로 정렬(§4), 링크는 brand-underline과 동일 시각(포커스 링은 base.css 링 목록의 `.prose a` — v0.6.1), 코드 블록 라운딩 제거(직각).
- `max-width: none` — 폭은 PageShell이 유일하게 결정(§5). `prose-invert`·`prose-neutral` 등 플러그인 변형 클래스 사용 금지.
- `.prose` 안에 `sd-*` 부품을 두면 typography 규칙(utilities 층)이 부품을 이긴다 → 부품은 `not-prose` 로 감싼다(§17).

## 7. 차트·데이터 시각화

- 팔레트는 UI와 **격리**: `dist/chart-palette.ts`를 앱에 복사(`lib/design/chart-palette.ts`). UI에 차트 색 금지, 차트에 brand 금지. **격리는 양방향이다 — 차트에 UI 상태색(`error`·`attention`)도 쓰지 않는다**(v0.6.0).
- `FAMILY_COLORS`(AI 모델 패밀리 11색) · `HEATMAP_LEVELS`(5단계, GitHub 그린 — 브랜드 그린 미사용: 대비 미달 결정) · `TOKEN_COMPOSITION`(4색) · `CHART_AXIS`(grid `rgba(0,0,0,.06)` · tick `rgba(0,0,0,.55)`). 히트맵 셀·범례 스와치는 직각(v0.3.0).
- 축·그리드·툴팁에 인라인 hex 금지 — `CHART_AXIS` 사용.
- 접근성: 범례·툴팁·표로 수치 병행(그래픽 정보 대비 기준 3:1, 색 단독 전달 금지).

## 8. 모션

`transition-colors`(기본 150ms) **하나만**. 이동·확대·페이드 등 장식 애니메이션 금지. `duration-*` 클래스 직접 지정 금지. `transition-opacity` 등 다른 transition도 금지 — 호버 피드백은 색으로(`hover:text-ink-muted` 등).

공식 예외: 로딩 스켈레톤의 `animate-pulse` — 장식이 아니라 로딩 상태 피드백(그 외 keyframe 애니메이션 금지). 스켈레톤 막대 폭은 고정값으로 둔다.

진행 표시에 새 움직임을 들이지 않는다: 「{동사} 중…」 + 경과 시간으로 쓰고, 깜빡이는 점·스피너를 새로 만들지 않는다(v0.6.0 · §6 행동 패턴).

## 9. 접근성 기준

- 텍스트 대비 ≥4.5:1 (토큰이 보장 — `ink-faint`가 하한), 그래픽 ≥3:1.
- 모든 인터랙티브 요소에 포커스 링(예외 = 복합 입력의 바깥 묶음, 아래 "복합 컨트롤 포커스") — 조작 클래스(§6 base.css 목록)는 내장, 보조 클래스(`sd-target` 등)와 그 밖의 커스텀 요소는 `brand-ring` 의무. 포커스 주 표시는 ink 고대비 링(≥3:1), **brand 단독 포커스 링 금지**(대비 1.36:1 미달).
- 터치/클릭 타깃: 버튼 md 40px 기준(sm은 보조 액션 한정). 문장 밖에 홀로 서는 텍스트 링크(BackLink·목록형 링크 등)는 크기 ≥24×24px 확보(WCAG 2.2 2.5.8 AA) — BackLink는 `.sd-target` 내장(§6), 커스텀 단독 링크도 `.sd-target` 으로 양축을 보장한다. 본문 문장 속 링크는 인라인 예외 — 줄 높이에 종속되므로 24px을 강제하지 않는다.
- 색 단독 정보 전달 금지(§1-4). 상태 변형(`--error`·`--attention`)은 언제나 문구를 함께 쓴다 — 인셋 안내는 첫 줄에 같은 뜻의 `.sd-status` 문구를 둔다.
- **강제 색상(고대비) 모드**(v0.6.0): 이 모드는 `box-shadow` 와 그라데이션 배경을 지우고 면을 시스템 색으로 바꾸지만 `border`·`outline` 은 시스템 색으로 그린다. 그래서 ① 포커스는 `outline` 을 지우지 않고 투명으로 둔다(이 모드에서 보인다) ② 버튼은 투명 1px 테두리를 갖는다 ③ 상태 표지는 `border` 로 그린다 ④ 셀렉트는 이 모드에서 네이티브 화살표로 돌아간다. 목록 행·탭의 선택선은 투명 테두리를 쓰지 않는다(이 모드에서 모든 행에 선이 생긴다) — 선택된 것만 테두리를 갖고 나머지는 padding 으로 자리를 맞춘다.
- 복합 컨트롤 포커스: 안쪽 조작 요소(`:focus-visible`)가 각자 링을 갖는다. **예외 — 복합 입력(`.sd-composer`)의 바깥 묶음에는 링이 없다**(v0.6.1): 글자 커서가 보이는 textarea 는 WCAG 2.4.7(AA)을 충족한다(W3C Understanding 2.4.7 의 예 "a vertical bar is displayed in the field"). 2.4.13(AAA 포커스 모양)은 충족하지 않음을 알고 받아들인다. 마우스 클릭에도 textarea 는 `:focus-visible` 이 되므로 "키보드일 때만 링"은 스크립트 없이 만들 수 없어 쓰지 않는다.
- 아이콘 전용 버튼은 `aria-label` 필수.
- 포커스 이동과 복귀: 제자리 확인 구획·오류 요약이 나타나면 그 제목(질문 문장)으로 포커스를 옮기고, 확인 구획을 닫으면 원래 버튼으로 되돌린다.
- 넓은 표의 스크롤 상자(`.sd-table-wrap`)와 코드 블록(`pre.sd-code`, v0.6.1)은 키보드로 스크롤할 수 있게 `tabindex="0"` + `role="region"` + `aria-label` 을 준다.

## 10. 브랜드 위계

- **sidoyu** = 메인 브랜드(사이트 전체). 로고타입은 `font-bold` 텍스트 "sidoyu".
- **YUNSFEED** = 뉴스레터 서브브랜드. 뉴스레터 영역 명칭에만 사용하고 **토큰은 전부 공유**(별도 색·폰트 없음).

## 11. 새 프로젝트 적용 절차 (5단계)

1. `dist/tokens.css` + `dist/base.css`를 프로젝트에 복사(또는 raw URL — **버전 태그 고정**, `main` 추적 금지). globals.css 순서: `@import "tailwindcss";` → `@import "./design/tokens.css";` → **`@import "./design/base.css" layer(components);`** → (선택) prose.css. `@tailwindcss/typography`를 쓰면 `registry/ui/prose.css`도 함께(§6). 일반 CSS 소비처는 §17.
2. Geist 폰트 연결: next/font로 Geist·Geist_Mono 로딩 후 `@theme { --font-sans: var(--font-geist-sans), "Apple SD Gothic Neo", "Noto Sans KR", ui-sans-serif, system-ui, sans-serif; --font-mono: var(--font-geist-mono), ui-monospace, monospace; }` glue 추가.
3. 필요한 프리미티브(`*.tsx`)와 `cx.ts`를 `registry/ui/`에서 `components/ui/`로 복사(차트 쓰면 `chart-palette.ts`도 `lib/design/`에).
4. `scripts/design-check.sh` 복사 + package.json에 `"design:check": "bash scripts/design-check.sh"` 추가. 의도적 예외는 `.design-check.allow`에 사유 주석과 함께.
5. 첫 페이지를 PageShell로 작성하고 `npm run design:check` 통과 확인.

> 비 Tailwind 환경은 두 갈래다(§17): 일반 CSS·생성 HTML 은 `dist/tokens.vars.css` + `dist/base.css` 를 그대로 쓴다(값을 손으로 옮기지 않는다). CSS 를 쓸 수 없는 메일·확장 팝업만 `dist/tokens.flat.json` 값을 쓴다.

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
| `text-brand` · `bg-brand`(면) | brand는 정체성 포인트(§1-2) |
| `border-brand`·`outline-brand`·`ring-brand`·`decoration-brand` | 선택 = 잉크 · 포커스 = 내장 링 또는 `brand-ring` · 링크 = `brand-underline` |
| `bg-error`·`bg-attention`(상태색 면) | 상태색은 글자·선·표지에만 — `.sd-status`·`.sd-callout` |
| `bg-ink/N`(잉크 투명도) | solid 호버는 `.sd-btn` 내부 구현 |
| 상태 이름에 색 이름(「노랑」·「초록」) | 의미어(「점검 필요」·「실패」·「정상」 — §16) |
| 토스트 | 제자리 문구·인셋 안내(§13) |
| `summary` 에 `aria-label` | 머리줄 문구 자체가 이름(§6 접이식) |
| 임의값: `text-[..]` `p*/m*-[..]` `gap-[..]` | 스케일 6단·4px 간격 스케일 (차트 내부 값은 chart-palette 상수) |
| Tailwind 팔레트 색 (`red-600` `gray-500` 등) | 시맨틱 토큰 — 상태색 = `error`·`attention` 토큰만(팔레트 허용이 아니다) · 차트 데이터 색은 chart-palette |
| 카드/버튼/입력 인라인 재구현 | 프리미티브 사용 |

## 13. 의도적 제외 + 재검토 트리거

| 제외 | 이유 | 재검토 트리거 |
|---|---|---|
| 다크모드 | 1인 운영 부담 2배, 카카오 인앱 대응 | 사용자(본인) 재결정 시 |
| 모서리 라운딩 | 직각·플랫 정체성 — 둥근 카드='AI 생성물' 인상(2026-06-11 사용자 결정, radius 토큰 삭제) | 사용자(본인) 재결정 시 |
| 그림자 토큰 | 시각 언어가 테두리 중심. 장식 그림자 금지(단, 포커스 링 구현용 `box-shadow`는 예외) | 떠 있는 레이어(모달 등) 도입 시 |
| z-index 토큰 | 고정값 3층 규칙(§5-1)으로 충분 | 겹침 층 4개 이상 |
| 성공·정보 색 | 정상은 조용하다. 녹색 성공은 브랜드와 색상각이 가깝다 | 성공을 놓쳐 생긴 실제 사고 1건 |
| 토큰 2층화(원시값 → 역할) | 이름이 이미 역할이고 화면 변화가 없다 | 다크모드 재결정, 또는 같은 원래 값을 역할 3개 이상이 나눠 쓸 때 |
| 보조·3차 브랜드 색조 | 액센트 하나 원칙(2026-10-29 사용자 결정) | 사용자(본인) 재결정 시 |
| 토스트 | 제자리 문구·인셋 안내로 충분 | 사용자가 하지 않은 백그라운드 작업 결과를 알릴 화면이 생길 때 |
| 모달 확인 | 제자리 확인 구획으로 충분(§6 행동 패턴) | 확인 대상이 화면 밖 여러 곳에 걸칠 때 |
| 아이콘 세트 | 크기·획·접근 이름 규칙만(§6 아이콘) | 두 소비처가 같은 아이콘 10개 이상을 그릴 때 |
| React 껍데기 추가 | 클래스만으로 충분(§6 CSS 규격) | 같은 규격을 한 소비처가 3화면 이상에서 쓰고 props 매핑이 생길 때 |
| shadcn/radix | 복합 인터랙션 없음 | 모달·드롭다운·콤보박스 필요 시 |
| npm 패키지 배포 | 소비처 1~2개, 복사가 단순 | 런타임 공유가 필요한 프로젝트 3개 이상 시 |
| Figma 양방향 동기화 | 1인 운영 부채 | 디자이너 협업 시작 시 |
| Storybook | `/design` 페이지로 대체 | 외부 기여자 생길 시 |

## 14. Figma 미러 규정

- 코드(`tokens.json`)가 원본, **Figma는 읽기 전용 미러**(시안 작업용). Figma에서 직접 수정 금지 — 수정하고 싶은 값은 tokens.json을 고치고 재생성.
- 생성: `dist/tokens.flat.json` 기반으로 Figma Variables(색·spacing — radius 토큰은 v0.3.0에서 삭제됨)·타입 스타일·프리미티브 프레임 생성(Phase 4, Figma MCP).
- 라이브러리 첫 페이지에 의무 표기: source repo · 버전 · 생성일. 매핑은 `figma/figma-manifest.json`에 보관.

## 15. 변경 관리

- semver-lite(§CHANGELOG.md). 소비처는 **버전 태그 고정**.
- 토큰·컴포넌트를 바꾸면: ① tokens.json/소스 수정 ② `npm run build`(dist/ 재생성 + `registry/ui/*.tsx` 첫 줄 버전 도장 갱신 — 버전은 `tokens.json` 의 `meta.version` 한 곳에만 적는다) ③ CHANGELOG 기록 ④ 소비 프로젝트는 각자 버전업 시점에 마이그레이션 메모를 보고 갱신.
- 새 토큰/variant 추가 전 자문: "기존 토큰·크기·위계로 해결되지 않는가?" — 대부분 해결된다.

## 16. 상태 표기와 문구 (v0.6.0)

1. **상태 네 축**: 정보 상태(정상·주의·문제) / 진행 / 업무 상태(활성·유휴 = 잉크 농담) / 조작 상태(선택·포커스·비활성). 상태색은 주의·문제에만 쓴다.
2. 상태 이름은 의미어로 쓴다(「점검 필요」·「실패」 — 「노랑」·「초록」 금지).
3. **판정 불가는 정상보다 조용하게 보이지 않는다** → `attention`(sidoyu 자체 결정).
4. 공통 부품은 상태를 추론하지 않는다. 예: 「접수됨 · 배달 미확인」은 완료가 아니다.
5. 한 화면의 정보 상태는 3개(정상·주의·문제)로 시작한다 — sidoyu 자체 결정이며, 외부 근거는 "표시기가 5~6개를 넘으면 인지 부담"이라는 IBM Carbon 지침이다(엄격한 상한이 아니다). 여러 상태를 묶어 요약하면 가장 심한 것으로 대표한다.
6. 문구 틀: 진행 「{동사} 중…」 + 경과 · 완료 「{대상} {과거형}」 · 오류 「무엇이 · 왜(알면) · 다음 행동」 · 빈 화면 「없는 것 + 다음 행동 하나」 · 버튼 = 동사 + 대상 · 파괴적 행동 = 예약어 + 대상.
7. 사용자가 직접 한 행동의 결과는 그 자리에서 보여 준다(토스트 아님).
8. 대화 화면의 역할 구분은 라벨(사용자 발화마다)과 위치로 한다. 말풍선 면·brand·상태색으로 역할을 가르지 않는다.
9. 로딩 버튼은 라벨을 유지하고 옆에 진행 문구를 둔다 · 제출 버튼은 미리 비활성하지 않는다 · 제출 시 오류가 있으면 오류 요약으로 포커스를 옮긴다 · 요청 중에는 중복 제출을 막는다(sidoyu 자체 조합 — Vercel Web Interface Guidelines 의 라벨 유지·사전 비활성 금지 + GOV.UK Design System 의 오류 요약 포커스).

> 출처: 오류 요약·칸 오류·접이식·인셋·면 없는 표 헤더 문법은 [GOV.UK Design System](https://design-system.service.gov.uk/) 을 각색했다(문서 = [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/), 별도 표시된 부분 제외). 상태 표시기 수에 관한 지침은 IBM Carbon Design System, `attention` 이라는 이름은 GitHub Primer 에서 참고했다. 문장은 sidoyu 가 다시 썼다.

## 17. 환경별 전달 (v0.6.0)

| 소비처 | 가져가는 것 | 순서·방법 |
|---|---|---|
| Tailwind | `dist/tokens.css` · `dist/base.css` · (선택) `registry/ui/prose.css` · `registry/ui/*.tsx` + `registry/ui/cx.ts` · `scripts/design-check.sh` | `@import "tailwindcss";` → `@import "./design/tokens.css";` → `@import "./design/base.css" layer(components);` → prose.css. 레이어로 넣어야 className 유틸리티가 `sd-*` 위에 온다 |
| 일반 CSS | `dist/tokens.vars.css` · `dist/base.css` | `<link>` 순서 tokens.vars → base → 소비처 CSS. base.css 는 레이어 밖이라 보통의 선택자 우선순위로 동작하고, 소비처의 `*`·요소 선택자 초기화는 `.sd-*` 에 진다. 우선순위가 같거나 높은 소비처 규칙은 여전히 이기므로 아래 경계 규칙을 지킨다 |
| 생성 HTML(서버가 HTML 문자열을 만드는 경우) | 같음 | 생성 시점에 `dist/` 파일을 읽어 `<style>` 에 끼운다(내보낸 HTML 이 자립형으로 남는다). 생성 코드 안에 CSS 를 붙여 넣지 않는다(손 복사가 다시 생긴다) |
| 메일·확장 팝업 | `dist/tokens.flat.json` 값 | CSS 변수를 쓸 수 없는 곳만 값을 인라인으로 쓴다 |

- **CSS·토큰은 `dist/` 파일만 복사한다**(`registry/ui/` 에서 가져가는 것은 React 부품 `*.tsx` + `cx.ts` 와 `prose.css` 뿐이다). 세 파일과 tsx 첫 줄의 버전 도장이 같은지 확인한다 — 토큰 파일과 base.css 의 판이 다르면 새 토큰(예: `--color-error`)이 정의되지 않아 색이 소리 없이 사라진다.
- **태그 고정**(`main` 추적 금지). 자동 갱신은 없다 — 소비처가 각자 버전을 올린다.
- **경계 규칙**: 부품의 시각 선언(색·테두리·padding·포커스)은 base.css 만 갖는다. 소비처 CSS 는 배치 선언(폭·위치·최대 높이·간격)만 둔다. 옮겨 올 때 base.css 가 대신하게 된 소비처의 시각 선언과 옛 전역 규칙(전역 `:focus-visible` 링 등)을 지운다.
- `.prose` 안의 `sd-*` 부품은 `not-prose` 로 감싼다.
- 복구 단위 = 소비처마다 "토큰·CSS·React·마크업·스크립트를 함께 바꾼 마이그레이션 변경 전체"를 되돌리는 커밋이다. 라이브러리 파일만 되돌리면 새 마크업의 스타일이 사라진다.
