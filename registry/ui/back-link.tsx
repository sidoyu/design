import Link from "next/link";

/**
 * 상세 페이지 상단 뒤로가기 — 부모 섹션으로 돌아가는 표준 내비게이션.
 * 모든 상세(자식) 페이지의 첫 요소로 쓴다. 다음 블록은 mt-3.
 * min-h-6·min-w-6: 텍스트는 text-xs를 유지하되 터치 타깃 24×24px 구조 보장(v0.5.2 — WCAG 2.5.8).
 */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="text-xs text-ink-faint">
      <Link href={href} className="inline-flex min-h-6 min-w-6 items-center brand-underline brand-ring">
        ← {children}
      </Link>
    </p>
  );
}
