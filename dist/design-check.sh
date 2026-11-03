#!/usr/bin/env bash
# AUTO-GENERATED from scripts/design-check.sh — 손으로 편집하지 말 것. (sidoyu-design v0.8.2)
# sidoyu design system — 금지 패턴 검사 (보조 안전망 — 권위는 docs/DESIGN.md · 무엇을 잡는지는 DESIGN §12 "검사" 열).
# 사용: bash design-check.sh [경로...]   (경로를 주지 않으면 . )
#   - 경로가 app·components·lib·src·registry 중 하나를 가진 폴더면 그 하위 폴더들을 검사한다(Tailwind 소비처 기본).
#   - 그 밖의 폴더·파일은 그대로 검사한다(일반 CSS 소비처는 실제 소스 경로를 넘긴다 — 예: static/).
# 소비 프로젝트는 dist/design-check.sh 를 복사하고 npm run design:check 등으로 연결한다.
# 예외 허용: .design-check.allow(실행 위치 기준, 경로 인자가 하나뿐인 기본 폴더면 그 폴더 안)에 정규식 한 줄씩(grep -E).
#            정규식은 위반 줄 전체 "경로:줄번호:내용"에 맞춰 본다. 빈 줄·#주석은 무시된다. 예외에는 반드시 # 사유를 함께 적을 것.
# 생성 파일(첫 줄에 AUTO-GENERATED 도장 — 이 저장소가 발행한 dist/ 사본)은 검사하지 않는다.
# 종료 코드: 0 = 검사 대상이 있고 위반 0건 · 1 = 위반 발견 · 2 = 검사 대상 없음(통과로 세지 않는다, v0.6.0)
#           3 = 실행 오류(없는 경로·grep 오류 — 검사를 못 했으므로 통과로 세지 않는다, v0.7.0)
set -u

[ $# -eq 0 ] && set -- .
STD_DIRS=(app components lib src registry)
TARGETS=()
ALLOW_FILE=".design-check.allow"
for arg in "$@"; do
  legacy=0
  if [ -d "$arg" ]; then
    for d in "${STD_DIRS[@]}"; do
      if [ -d "$arg/$d" ]; then TARGETS+=("$arg/$d"); legacy=1; fi
    done
  fi
  if [ "$legacy" -eq 0 ]; then
    if [ ! -e "$arg" ]; then
      echo "[design-check] 실행 오류 — 없는 경로: $arg"
      exit 3
    fi
    TARGETS+=("$arg")
  elif [ $# -eq 1 ]; then
    ALLOW_FILE="$arg/.design-check.allow"
  fi
done

echo "[design-check] 검사 범위: tsx·ts·jsx·js·css·html (Python·생성 HTML·AUTO-GENERATED 사본 미검사)"
FILES=()
if [ ${#TARGETS[@]} -gt 0 ]; then
  while IFS= read -r f; do
    head -n 2 "$f" | grep -q 'AUTO-GENERATED' && continue
    FILES+=("$f")
  done < <(find "${TARGETS[@]}" -type f \( -name '*.tsx' -o -name '*.ts' -o -name '*.css' -o -name '*.jsx' -o -name '*.js' -o -name '*.html' \) -not -path '*/node_modules/*' 2>/dev/null)
fi
if [ ${#FILES[@]} -eq 0 ]; then
  echo "[design-check] 검사 대상 없음 — 통과로 세지 않음(tsx·ts·jsx·js·css·html 0개): $*"
  exit 2
fi

# allow 파일에서 빈 줄·주석 제거(빈 정규식이 모든 위반을 삼키는 사고 방지)
# 줄마다 괄호로 감싸 | 로 이어 정규식 하나로 만든다(임시 파일·프로세스 치환에 기대지 않는다)
ALLOW_RE=""
if [ -f "$ALLOW_FILE" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in ''|'#'*) continue ;; esac
    trimmed="${line#"${line%%[![:space:]]*}"}"
    case "$trimmed" in ''|'#'*) continue ;; esac
    ALLOW_RE="${ALLOW_RE:+$ALLOW_RE|}($line)"
  done < "$ALLOW_FILE"
fi

# 클래스 경계: 따옴표·백틱·공백 + 변형 접두의 콜론(sm:·hover:)
B="['\"\`[:space:]:]"
E="(['\"\`[:space:]]|$)"
# 패턴 목록: 정규식 <탭> 설명 [<탭> 이 패턴에만 쓰는 예외 정규식(위반 줄 "경로:줄:내용"에 맞춤)]
PATTERNS=(
  $'dark:\t라이트 전용 시스템 — dark: 클래스 금지'
  $'prefers-color-scheme:[[:space:]]*dark\t라이트 전용 시스템 — 다크 미디어 질의 금지'
  $'class(Name)?=[\'"][^\'"]*#[0-9a-fA-F]{3,8}\tclass 안 인라인 hex 금지(토큰 사용)'
  $'(text|border|bg|decoration|ring|outline|fill|stroke)-black/\tblack/ 투명도 직접 사용 금지(ink-muted·ink-faint·line·surface-subtle 토큰 사용)'
  $'(text|border|bg)-white/\twhite/ 투명도 직접 사용 금지(라이트 전용 — 잔재)'
  "${B}rounded([-'\"\`[:space:]]|\$)"$'\tradius 전면 금지 — 직각 모서리(v0.3.0 플랫 전환)'
  $'border-radius[[:space:]]*:[^;}]*\tradius 전면 금지 — 직각 모서리(0 만 허용)\t:[[:space:]]*0(px|rem|em|%)?[[:space:]]*(!important)?[[:space:]]*$'
  "${B}(shadow|backdrop)-"$'\t그림자·블러 금지 — 플랫(포커스 링 box-shadow 는 base.css 정본만)'
  $'box-shadow[[:space:]]*:[^;}]*\t그림자 금지 — 플랫(포커스 링은 base.css 정본만)\t(registry/ui/base\\.css:[0-9]+:|:[[:space:]]*none[[:space:]]*(!important)?[[:space:]]*$)'
  $'(linear|radial|conic)-gradient\\(\t그라데이션 금지(§1-3-1 — 셀렉트 화살표 도형은 base.css 정본만)\tregistry/ui/base\\.css:[0-9]+:'
  "${B}border ([^'\"\`]* )?([a-z0-9-]+:)*border-line${E}|${B}border-line ([^'\"\`]* )?([a-z0-9-]+:)*border${E}"$'\t사면 박스 금지 — 구획은 수평선(border-t/b)·여백(기능 테두리는 allow에 사유와 함께)'
  $'max-w-(xs|sm|md|lg|xl|[2-7]xl)([^a-z-]|$)\t컨테이너 폭은 max-w-wide/reading/narrow만 허용(PageShell 사용)'
  "${B}text-(xl|[4-9]xl)${E}"$'\t타입 스케일 6단(xs·sm·base·lg·2xl·3xl) 밖 크기 금지'
  "${B}underline${E}"$'\t본문 링크는 brand-underline 사용(단독 underline 금지)'
  $'duration-[0-9]+\tduration 직접 지정 금지(transition-colors 기본 150ms 사용)'
  "${B}(transition(-(all|opacity|transform|shadow))?|animate-(spin|bounce|ping))${E}"$'\t움직임은 transition-colors 하나(로딩 스켈레톤 animate-pulse 만 예외)'
  "(text|bg)-brand${E}"$'\tbrand는 텍스트·면 배경 금지(포인트 전용 — hover/selection 토큰만)'
  $'text-\\[\t임의 텍스트 크기 금지(타입 스케일 6단: xs·sm·base·lg·2xl·3xl)'
  "${B}(p|m)[tblrxy]?-\\["$'\t임의 간격 금지(Tailwind 4px 기본 스케일 사용)'
  "${B}(gap(-[xy])?|space-[xy])-\\["$'\t임의 간격 금지(gap·space — 4px 스케일 사용)'
  $'(text|bg|border|decoration|ring|outline|fill|stroke|from|via|to|accent|caret|divide|placeholder)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]\tTailwind 팔레트 색 직접 사용 금지(시맨틱 토큰 — 상태색 = error·attention 토큰만 · 차트 데이터 색은 chart-palette)'
  $'bg-(error|attention)\t상태색은 글자·선·표지에만(면 금지 — .sd-status·.sd-callout 사용)'
  $'(border|outline|ring|decoration)-brand([^-]|$)\tbrand 선·단독 포커스 금지(선택 = 잉크, 포커스 = 내장 링·brand-ring, 링크 = brand-underline)'
  $'(text|bg|border|decoration|ring|outline|fill|stroke|divide|placeholder)-(ink|ink-muted|ink-faint|surface|surface-subtle|line|brand|brand-hover|brand-selection|error|attention)/[0-9[]\t토큰 투명도 직접 사용 금지(정해진 토큰 값만 — 호버는 sd-* 내부 구현)'
)

FAIL=0
TAB=$'\t'
for entry in "${PATTERNS[@]}"; do
  pattern="${entry%%"$TAB"*}"
  rest="${entry#*"$TAB"}"
  message="${rest%%"$TAB"*}"
  except=""
  [ "$rest" != "$message" ] && except="${rest#*"$TAB"}"
  hits=$(grep -nHE -- "$pattern" "${FILES[@]}" 2>/dev/null)
  rc=$?
  if [ "$rc" -ge 2 ]; then
    echo "[design-check] 실행 오류 — grep 실패(rc=$rc): $message"
    exit 3
  fi
  # 예외가 있는 패턴(CSS 선언)은 일치한 조각만 뽑아(-o) 선언 하나씩 허용값을 판정한다 — 같은 줄의 허용 선언이 금지 선언을 가리지 않게.
  # 판정에서 남은 "경로:줄" 의 원래 줄만 남겨, 아래 사용자 allow 는 원문 줄 전체에 맞춰 본다
  if [ -n "$hits" ] && [ -n "$except" ]; then
    NL=$'\n'
    bad=$(grep -noHE -- "$pattern" "${FILES[@]}" 2>/dev/null | grep -vE -- "$except" | cut -d: -f1,2 | sort -u)
    kept=""
    if [ -n "$bad" ]; then
      # 임시 파일을 쓰는 here-document·here-string 대신 줄 단위 for(글로빙 끔)
      set -f; OLD_IFS="$IFS"; IFS="$NL"
      for line in $hits; do
        key="${line%%:*}"; rest2="${line#*:}"; key="$key:${rest2%%:*}"
        case "$NL$bad$NL" in *"$NL$key$NL"*) kept="$kept$line$NL" ;; esac
      done
      IFS="$OLD_IFS"; set +f
    fi
    hits="${kept%"$NL"}"
  fi
  if [ -n "$hits" ] && [ -n "$ALLOW_RE" ]; then
    hits=$(printf '%s\n' "$hits" | grep -vE -- "$ALLOW_RE")
  fi
  if [ -n "$hits" ]; then
    echo "✗ $message"
    echo "$hits" | head -20
    count=$(echo "$hits" | wc -l | tr -d ' ')
    [ "$count" -gt 20 ] && echo "  ... 외 $((count - 20))건"
    echo
    FAIL=1
  fi
done

if [ "$FAIL" -eq 0 ]; then
  echo "[design-check] OK — 금지 패턴 0건 (파일 ${#FILES[@]}개)"
else
  echo "[design-check] 위반 발견. 토큰/프리미티브로 교체하거나, 의도적 예외면 .design-check.allow 에 사유(#)와 함께 추가."
fi
exit "$FAIL"
