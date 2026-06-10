#!/usr/bin/env bash
# sidoyu design system — 금지 패턴 검사 (보조 안전망 — 권위는 docs/DESIGN.md).
# 사용: bash design-check.sh [검사루트(기본 .)]
# 소비 프로젝트에 이 파일을 복사하고 npm run design:check 로 연결한다.
# 예외 허용: 검사루트의 .design-check.allow 에 "경로패턴" 한 줄씩 (grep -E, 파일경로 기준).
#            빈 줄·#주석은 무시된다. 예외에는 반드시 # 사유를 함께 적을 것.
set -u

ROOT="${1:-.}"
ALLOW_FILE="$ROOT/.design-check.allow"
TARGETS=()
for d in app components lib src; do
  [ -d "$ROOT/$d" ] && TARGETS+=("$ROOT/$d")
done
if [ ${#TARGETS[@]} -eq 0 ]; then
  echo "[design-check] 검사할 디렉터리(app/components/lib/src)가 없습니다: $ROOT"
  exit 0
fi

# allow 파일에서 빈 줄·주석 제거(빈 정규식이 모든 위반을 삼키는 사고 방지)
ALLOW_PATTERNS=""
if [ -f "$ALLOW_FILE" ]; then
  ALLOW_PATTERNS=$(grep -vE '^[[:space:]]*($|#)' "$ALLOW_FILE" || true)
fi

# 패턴 목록: 정규식과 설명을 탭으로 구분(정규식 안의 | 와 충돌 방지)
PATTERNS=(
  $'dark:\t라이트 전용 시스템 — dark: 클래스 금지'
  $'class(Name)?="[^"]*#[0-9a-fA-F]{3,8}\tclassName 안 인라인 hex 금지(토큰 사용)'
  $'(text|border|bg|decoration)-black/\tblack/ 투명도 직접 사용 금지(ink-muted·ink-faint·line·surface-subtle 토큰 사용)'
  $'(text|border|bg)-white/\twhite/ 투명도 직접 사용 금지(라이트 전용 — 잔재)'
  $'rounded-(sm|md|lg|xl|2xl|3xl)([^a-z-]|$)\tradius는 rounded-card/rounded-control/rounded-full만 허용'
  $'max-w-(xs|sm|md|lg|xl|[2-7]xl)([^a-z-]|$)\t컨테이너 폭은 max-w-wide/reading/narrow만 허용(PageShell 사용)'
  $'text-(4xl|5xl|6xl|7xl|8xl|9xl)\t타입 스케일 6단(xs~3xl) 밖 크기 금지'
  $'["[:space:]]underline["[:space:]]\t본문 링크는 brand-underline 사용(단독 underline 금지)'
  $'duration-[0-9]+\tduration 직접 지정 금지(transition-colors 기본 150ms 사용)'
  $'(text|bg)-brand["[:space:]]\tbrand는 텍스트·면 배경 금지(포인트 전용 — hover/selection 토큰만)'
  $'text-\\[\t임의 텍스트 크기 금지(타입 스케일 6단: xs·sm·base·lg·2xl·3xl)'
  $'rounded-\\[\t임의 radius 금지(rounded-card/control/full — 차트 내부 값은 chart-palette 상수로)'
  $'["[:space:]](p|m)[tblrxy]?-\\[\t임의 간격 금지(Tailwind 4px 기본 스케일 사용)'
  $'(text|bg|border|decoration|ring|outline|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]\tTailwind 팔레트 색 직접 사용 금지(시맨틱 토큰 — 차트 데이터 색은 chart-palette)'
)

FAIL=0
for entry in "${PATTERNS[@]}"; do
  pattern="${entry%%$'\t'*}"
  message="${entry#*$'\t'}"
  hits=$(grep -rnE --include='*.tsx' --include='*.ts' --include='*.css' --include='*.jsx' --include='*.js' \
    "$pattern" "${TARGETS[@]}" 2>/dev/null | grep -v 'AUTO-GENERATED' || true)
  if [ -n "$hits" ] && [ -n "$ALLOW_PATTERNS" ]; then
    hits=$(echo "$hits" | grep -vEf <(echo "$ALLOW_PATTERNS") || true)
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
  echo "[design-check] OK — 금지 패턴 0건"
else
  echo "[design-check] 위반 발견. 토큰/프리미티브로 교체하거나, 의도적 예외면 .design-check.allow 에 사유(#)와 함께 추가."
fi
exit "$FAIL"
