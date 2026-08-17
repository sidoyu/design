import Link from "next/link";
import { cx } from "./cx";

/**
 * 구획 블록(v0.4.0 — 박스 아님): 상단 헤어라인 룰 + 세로 패딩으로만 구획한다(gov.uk 문법).
 * href를 주면 전체가 링크가 되고 브랜드 호버 틴트+포커스 링이 붙는다.
 * 호버 틴트는 -mx-2 px-2로 좌우 8px만 확장(v0.5.1) — 텍스트 기준선은 유지, gap-4 그리드에서 인접 카드와 안 겹치는 상한.
 * 인라인으로 구획 마크업을 복제하지 말 것 — 변형이 필요하면 이 컴포넌트를 확장한다.
 */
type CardProps = {
  href?: string;
  /** 카드 상단 소문자 라벨 (예: NEWSLETTER) */
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

const BASE = "block border-t border-line py-5";

export function Card({ href, eyebrow, title, description, className, children }: CardProps) {
  const inner = (
    <>
      {eyebrow ? (
        <p className="text-xs tracking-wide text-ink-faint uppercase">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="mt-2 text-lg font-semibold">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-ink-muted">{description}</p> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx(BASE, "-mx-2 px-2 transition-colors hover:bg-brand-hover brand-ring", className)}>
        {inner}
      </Link>
    );
  }
  return <div className={cx(BASE, className)}>{inner}</div>;
}
