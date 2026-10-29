# Changelog

표기 규칙(semver-lite):
- **major** — 기존 소비처가 깨지는 변경(토큰 삭제·개명, 컴포넌트 API 변경)
- **minor** — 추가만 있는 변경(새 토큰·새 컴포넌트)
- **patch** — 값 미세 조정·문서·버그픽스

단, 1.0 이전에는 minor 릴리스가 breaking 변경을 포함할 수 있다(semver 0.x 관행 — v0.3.0·v0.4.0·v0.5.0이 이에 해당). major 승격은 1.0.0 도달 시점에 판단한다.

소비처는 `main`이 아니라 **버전 태그를 고정**해서 가져간다. 버전을 올릴 땐 breaking 항목에 마이그레이션 메모를 함께 적는다.

## v0.7.0 — 2026-10-29

**minor** — v0.6.1 독립 감사(마기 3자 + Codex 보충 회차, `claude-ops/handoffs/sidoyu-design/magi-20261029-audit/synthesis.md` §6)의 결론과 소유자 결정 2건. 일반 CSS 소비처 두 곳(로컬 에이전트 대화창·로그 대시보드)이 기대는 전달 경로의 빈칸, 소비처가 각자 만든 요소의 미정의, 문서·CSS·검사 사이의 어긋남을 고쳤다.

- **소유자 결정 2건(2026-10-29)**: ① 화면 문구 어미 = 합니다체(§16-6) ② 대화의 사용자 발화 = 오른쪽 + `surface-subtle` 면(`.sd-user-turn`, 직각) · 보이는 「나」 라벨 없음 · 화면낭독기용 `<span class="sd-vh">나:</span>`(§16-8 개정, §1-3-2·§1-4 에 예외 한 줄씩). v0.6.0 의 "말풍선 면으로 역할을 가르지 않는다"를 뒤집는다 — Claude·ChatGPT 앱과 같은 관례가 사용자 친화성에서 앞선다는 판단.
- **토큰**: 글꼴 스택 `--font-sans`·`--font-mono` 를 발행(새 `font` 그룹, 한글 폴백 포함) · 차트 선·범례 색 3:1 미달 2개 조정(`gpt-api` #0EA5E9→#0369A1 · `other`·`cache-write` #A3A3A3→#8A8A8A) · 토큰 설명문 정리.
- **base.css 새 클래스 6**: `.sd-layer`(+`::backdrop` — 서랍·패널·모달, 네이티브 dialog, 사면 잉크 1px) · `.sd-range`(sidoyu.com `.range-ink` 를 옮김) · `.sd-user-turn` · `.sd-prose`(일반 CSS 용 긴 글) · `.sd-block-title`·`.sd-block-desc`(Card 의 tsx 에서 옮김).
- **base.css 동작 변경**: `[hidden]` 이 언제나 이김 · `body` 글꼴 = `--font-sans` · 호버를 `@media (hover: hover)` 안으로(터치 기기 잔상 제거) · `.sd-field` 16px(아이폰 입력 확대 방지) · 텍스트 링크(`.brand-underline`·`.sd-prose a`) 포커스 링 내장 + 글자색 = 둘레(일반 CSS 에서 브라우저 기본 파랑이 나오지 않게) · `.sd-vh` 가 키보드 포커스를 받으면 드러남(건너뛰기 링크) · 아이콘 획(`fill: none` · `stroke: currentColor` · 1.75)과 sm 버튼 아이콘 16px · `.sd-num` Geist Mono · `.sd-code` 인라인 = 둘레 크기 상속 / 블록 = 14px · 복합 입력 textarea outline 투명.
- **prose.css**: 표 머리선 = 잉크 · `kbd` 라운딩·그림자 제거.
- **React**: `TableWrap` 신설(9종) · Card 제목·설명 = 새 클래스 · BackLink = `.sd-meta` + 링 내장 링크(`brand-ring` 불필요) · Segmented 라벨 = `.sd-label`.
- **발행물 +2**: `dist/prose.css`·`dist/design-check.sh`(버전 도장). 판 번호는 `tokens.json` 한 곳 — package.json 의 version 과 DESIGN.md 머리의 판 번호를 지웠다.
- **design-check**: 변형 접두(`sm:`·`hover:`)·작은따옴표·백틱 경계 · 클래스 순서 무관한 사면 박스 · `text-xl` · 토큰 투명도 일반화(`text-ink/40` 등) · 움직임(`transition-all`·`animate-spin` 등) · CSS 선언(0 이 아닌 `border-radius`·`box-shadow`·그라데이션·다크 미디어 질의) · 패턴별 예외(base.css 정본의 포커스 링·셀렉트 화살표) · AUTO-GENERATED 사본 건너뜀 · `.html` 검사 · 경로 인자 여러 개(일반 CSS 소비처는 실제 소스 경로) · 허용 목록 주석을 실제 동작("경로:줄:내용")에 맞춤.
- **DESIGN.md**: §1(그라데이션 금지·기능 테두리 세 가지 열거·넓은 면 예외 둘) · §2(지원 범위·인벤토리를 도장 포인터로) · §3 · §4(글꼴 스택·입력 16px·굵기 넷·줄간격 규칙과 코드 블록 예외) · §5(간격 px 병기·머리글 링크와 내비게이션·건너뛰기·겹침 순서 = 10·20 + dialog top layer·안전 영역) · §6(TableWrap·읽기 전용 결과 = `pre.sd-code`·오류 요약 조건 "하나 이상"·전역 알림·넓은 표의 뜻·접이식 판정 시점·복합 입력 링 기준·슬라이더·떠 있는 층·사용자 발화·긴 글·파일 첨부·대화 본문 그림·실행 전 「되돌릴 수 없습니다」= `attention`) · §7(차트 3:1) · §8(호버 피드백 정리·스켈레톤 1초·모션 줄이기) · §9(title 툴팁·비활성 대비·호버·스크롤 여백·320px·200% 확대) · §11 · §12(검사 열) · §13(그림자·z-index·2층화·shadcn·npm 이유 갱신 + 트리거 7행) · §14·§15·§16·§17(웹폰트 로딩·검사 경로).
- **완료 검토(Codex 4b) 반영**: `.sd-prose` 안쪽 규칙을 `:where()` 로 낮춰 본문 안 `sd-*` 부품이 이기게 · `.sd-user-turn` `border-box` · 강제 색상 모드에서 슬라이더 트랙·손잡이를 시스템색으로 · 긴 글 줄간격 1.75(typography 와 같게)·사용자 발화 24px · design-check 실행 오류(없는 경로·grep 오류) = exit 3, here-string·프로세스 치환 제거, CSS 선언을 선언 단위로 판정(같은 줄의 허용 선언이 금지 선언을 가리지 않게)·콜론 앞 공백, 변형 접두가 붙은 사면 박스.
- **버튼 크기 혼용 금지**(§6 Button, 소유자 지적 2026-10-29): 한 `.sd-actions` 줄 안에서 md·sm 을 섞지 않는다 — 시험 화면에서 높이가 들쭉날쭉해 보인 원인.
- **정정**: v0.6.1 은 새 클래스(`.sd-code`)를 더했으므로 규칙상 minor 였다. 태그는 고치지 않고 이번 판을 v0.7.0 으로 올린다.

마이그레이션: `dist/` 의 tokens(.css/.vars.css)·base.css·prose.css·design-check.sh 와 `registry/ui/*.tsx` 를 다시 복사한다. 소비처에서 할 일 —
- **공통**: 숨김을 지키려고 둔 `[hidden] { display: none !important }` 사본을 지운다 · 아이콘 획·스크림 투명도·글꼴 스택을 소비처 CSS 에 적은 곳을 지운다(채운 도형 아이콘은 그 도형에만 `fill: currentColor`) · 실행 전 「되돌릴 수 없습니다」 구획을 `--attention` 으로 바꾼다 · 화면 문구를 합니다체로 맞춘다.
- **sidoyu.com**: `.range-ink` → `.sd-range`(globals.css 사본 삭제) · 글꼴 glue 에 한글 폴백을 넣고 next/font `variable` 클래스를 `<body>` 에서 `<html>` 로 옮긴다(§11) · `app/ai/page.tsx` 의 `text-xl` 2곳 → `text-lg`(새 검사가 잡는다) · `readOnly` 결과칸 2곳(crypt·mathscript) → `pre.sd-code` + 복사 · 표 스크롤 상자 → `TableWrap` · 허용 목록의 낡은 세그먼트 줄 정리.
- **대화 화면**: 사용자 발화 = `.sd-user-turn` + 오른쪽 배치 + `sd-vh` 「나:」 · 답 = `.sd-prose` · 서랍 = `<dialog class="sd-layer">` · 건너뛰기 링크 · 첨부 = §6 파일 첨부.

## v0.6.1 — 2026-10-29

**patch** — 대화 화면(18090 로컬 에이전트)에 v0.6.0 을 들이기 전에 고친 5건 + 소비처 인계 후속 2건. 근거: 18090 화면 개선 마기(2026-10-29 · `claude-ops/handoffs/local-llm/display-magi-20261029/synthesis.md`)와 sidoyu.com 적용 인계(`S6-consumer-handoff.md` §2-1·§4).

- **복합 입력 포커스 링 제거**: `.sd-composer:focus-within` 을 링 목록에서 뺐다. 글자 커서가 포커스 표시다(WCAG 2.4.7 AA 충족, 2.4.13 AAA 미충족을 알고 받아들임 — §9). 안쪽 버튼 링은 그대로다. 변형 클래스는 만들지 않았다(링을 원하는 소비처가 없다).
- **접이식 머리줄 상태 글자 한 줄 고정**: `.sd-details > summary > .sd-status { flex: none; white-space: nowrap }` · 펼침 표지(`::before`)도 `flex: none`. 한글 음절 줄바꿈 때문에 「실/패」로 쪼개지던 문제.
- **접이식 펼침 규칙 개정**: "실패가 있으면 기본 펼침" → **결과인 실패 = 펼침 / 과정인 실패 = 머리줄의 「실패」만**(§6 접이식).
- **§5-1 머리글**: 화면 가장자리 기준이고 본문 열 끝과 맞추지 않는다 · 좁은 화면에서는 머리글과 본문이 같은 좌우 여백.
- **대화 본문 대응표**(§6 행동 패턴): 표·인용·링크·코드·접이식을 기존 규격에 대응. 원시 HTML 은 글자로.
- **`.sd-code` 신설**(인라인·블록 코드 한 클래스): 대응표의 코드 자리가 비어 소비처 CSS 가 면·글꼴을 직접 적던 것(경계 규칙 위반)을 base.css 로 옮긴다. 블록 = `tabindex="0"` + `role="region"` + `aria-label`(표 스크롤 상자와 같은 규격, 링 내장 — Codex 4b P2 반영).
- **표 머리 규칙을 `thead th` 로 좁힘**(인계 후속 1): 몸통의 행 머리 `th` 는 `td` 와 같은 칸 + `font-medium` 왼쪽 정렬. 정렬 단추 초기화도 `thead th > button` 만.
- **긴 글 본문 링크 포커스 링**(인계 후속 1): base.css 링 목록에 `.prose a`.

마이그레이션: `dist/base.css`·`dist/tokens*.css`·`registry/ui/*.tsx`(버전 도장만 바뀜)·`prose.css` 를 다시 복사한다. 소비처에서 할 일 — ① 복합 입력에 링을 다시 그리는 소비처 규칙이 있으면 지운다 ② 표에서 `tbody th` 에 머리 모양을 기대한 곳이 있으면 `thead` 로 옮긴다(2026-10-29 기준 사용처 없음) ③ 코드 면·글꼴을 소비처 CSS 에 적은 곳은 `.sd-code` 로 바꾼다.

## v0.6.0 — 2026-10-29

**minor(breaking 포함, 0.x 관행)** — 모양 정본을 `base.css` 의 `sd-*` 클래스 한 장으로 모으고, 상태색 2개와 CSS 규격 12개를 더했다. 근거: React 전용 부품을 일반 CSS 소비처가 손으로 베끼며 이름·값이 갈라지던 구조(전달 통로 결손)와, 오류·판정 불가가 잉크로 접혀 정상과 구별되지 않던 문제.

- **토큰 +2**: `error #B3261E`(흰 배경 6.54:1) · `attention #B45309`(5.02:1). 글자·가는 선·작은 표지에만 — 면·차트 금지. 두 색은 적록 색약 근사에서 거의 같으므로 상태는 문구 + 표지 모양(채운/빈 사각)으로 가른다. 토큰 설명문 6개 갱신(brand·ink-muted·ink-faint·surface·surface-subtle·line — 대비 수치 정정 포함).
- **발행물 +2**: `dist/tokens.vars.css`(일반 CSS 용 `:root` 변수 — `tokens.css` 와 같은 이름·값) · `dist/base.css`(첫 줄 버전 도장). 빌드가 `registry/ui/*.tsx` 첫 줄 버전 도장도 갱신한다(버전은 `tokens.json` 한 곳).
- **base.css = 모양의 유일한 정본**(레이어로 감싸지 않는다). 기존 7종의 모양을 `sd-page`·`sd-measure-*`·`sd-block`·`sd-block-link`·`sd-btn`(+`--ghost`·`--sm`)·`sd-field`·`sd-label`·`sd-badge`·`sd-eyebrow` 로 옮겼다(겉모습 같음).
- **CSS 규격 12개 신설**: 상태 표기 `sd-status` · 인셋 안내 `sd-callout` · 칸 오류 `sd-error-msg` · 표 `sd-table`(+`sd-table-wrap`·`sd-num`·`sd-row--idle`) · 접이식 `sd-details` · 목록 행 `sd-list-item` · 탭·세그먼트 `sd-tabs`·`sd-tab` · 복합 입력 `sd-composer` · 읽기판 `sd-readout` · 폼 컨트롤(`accent-color: ink`·`select.sd-field`) · 아이콘 버튼 `sd-btn--icon` · 행동 묶음 `sd-actions`. 보조 `sd-meta`·`sd-icon`·`sd-target`·`sd-vh`.
- **React**: 기존 7종은 API 그대로 안쪽 className 만 `sd-*` 로. Button·ButtonLink 에 선택값 `icon`(아이콘 전용 정사각, `aria-label` 타입 강제) 추가. **Segmented 신설**(8종) — 선택 표시 = 잉크 밑줄, 그룹 라벨 필수(`hideLabel` 로 화면에서만 숨김 가능).
- **포커스 링 내장 범위**: 조작 클래스 전부(`sd-btn`·`sd-field`·`sd-tab`·`sd-list-item`·`sd-details` 머리줄·`sd-block-link`·표 정렬 단추·키보드 스크롤 상자 `sd-table-wrap`·`sd-composer`·체크·라디오). 보조 클래스(`sd-target` 등)에는 `brand-ring` 을 함께 쓴다.
- **강제 색상(고대비) 모드**: 포커스 outline 을 투명으로 남김 · 버튼 투명 테두리 · 상태 표지 border · 셀렉트 네이티브 화살표 복원.
- **design-check**: 패턴 +3(`bg-error|attention` · `border|outline|ring|decoration-brand` · `bg-ink/`) · 검사 대상에 `registry` 추가 · 검사 대상 없음 = **exit 2**(통과로 세지 않음) · 첫 줄 검사 범위 고지.
- **DESIGN.md**: §1-2(brand = 정체성 포인트, 선택·역할·상태 표시 금지) · §1-3-2 · §1-4(구분 기능 선·면 = 잉크 또는 상태색) · §3 · §4 한글 폴백 · §5-1 작업 화면 배치(신설) · §6 전면 개정 · §7 차트 격리 양방향 · §8 진행 표시 · §9 강제 색상 모드 외 · §11 · §12 · §13 · §16 상태 표기와 문구(신설) · §17 환경별 전달(신설). 공식 예외 "`hover:bg-ink/80` 내부 전용" 삭제(호버가 CSS 안으로 들어감).

**breaking 4건과 마이그레이션**
1. React 부품 내부 클래스가 `sd-*` 로 바뀜 → `registry/ui/*.tsx` 7파일(8종 — Input·Textarea 가 한 파일) + `cx.ts` 를 다시 복사하고 `dist/base.css` 를 함께 넣는다(둘 중 하나만 바꾸면 모양이 사라진다).
2. Tailwind 소비처는 `@import "./design/base.css" layer(components);` 로 가져온다 — `brand-ring`·`brand-underline` 도 components 층에 들어가 className 유틸리티가 그 위에 온다.
3. `base.css` 는 `registry/ui/` 가 아니라 `dist/` 에서 복사한다(버전 도장 확인 — `tokens.css`·`base.css`·tsx 첫 줄이 같은 판이어야 한다).
4. 문서 계약 변경: Badge = 분류 꼬리표 전용(상태는 `sd-status`) · 폼 에러 = `error` 글자 + 숨은 접두 「오류:」 + `aria-describedby` · 입력 오류 = `aria-invalid` 로 테두리 `error`.
- 새 검사 패턴(`border-brand` 등)에 걸리는 기존 코드는 잉크로 바꾸거나 `.design-check.allow` 에 사유와 함께 둔다.
- 1.0 은 세 소비처가 v0.6.x 로 옮겨 간 뒤 한 달 동안 breaking 이 없으면 판단한다.

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
