# Changelog

표기 규칙(semver-lite):
- **major** — 기존 소비처가 깨지는 변경(토큰 삭제·개명, 컴포넌트 API 변경)
- **minor** — 추가만 있는 변경(새 토큰·새 컴포넌트)
- **patch** — 값 미세 조정·문서·버그픽스

소비처는 `main`이 아니라 **버전 태그를 고정**해서 가져간다. 버전을 올릴 땐 breaking 항목에 마이그레이션 메모를 함께 적는다.

## v0.1.0 — 2026-06-10

최초 발행.

- 토큰 단일 원본 `tokens/tokens.json` (색 9·radius 2·컨테이너 3·모션 1·타이포 8·차트 21·이메일 3)
- 빌드 파이프라인 `scripts/build-tokens.mjs` → `dist/tokens.css`(@theme)·`chart-palette.ts`·`tokens.flat.json`
- 프리미티브 6종: PageShell·Card·Button(+ButtonLink)·Input(+Textarea)·Badge·base.css
- 스펙 문서 `docs/DESIGN.md`
- 금지 패턴 검사 `scripts/design-check.sh`
- 주요 결정: 라이트 전용(다크모드 없음)·네온 그린은 포인트 전용·차트 팔레트 격리·텍스트 투명도 하한 0.55(AA)
