import Link from "next/link";
import { cx } from "./cx";

/**
 * 범용 카드 컨테이너. href를 주면 전체가 링크가 되고 브랜드 호버 틴트가 붙는다.
 * 인라인으로 카드 마크업을 복제하지 말 것 — 변형이 필요하면 이 컴포넌트를 확장한다.
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

const BASE = "block border border-line p-5";

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
      <Link href={href} className={cx(BASE, "transition-colors hover:bg-brand-hover brand-ring", className)}>
        {inner}
      </Link>
    );
  }
  return <div className={cx(BASE, className)}>{inner}</div>;
}
