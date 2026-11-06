// sidoyu-design v0.10.1 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
import Link from "next/link";
import { cx } from "./cx";

/**
 * 구획 블록(v0.4.0 — 박스 아님, 모양 = base.css .sd-block): 상단 헤어라인 룰 + 세로 패딩으로만 구획한다(gov.uk 문법).
 * href를 주면 전체가 링크가 되고 브랜드 호버 틴트+포커스 링이 붙는다(.sd-block-link).
 * 호버 틴트는 좌우 8px만 확장(v0.5.1) — 텍스트 기준선은 유지, gap-4 그리드에서 인접 카드와 안 겹치는 상한.
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

export function Card({ href, eyebrow, title, description, className, children }: CardProps) {
  const inner = (
    <>
      {eyebrow ? <p className="sd-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="sd-block-title mt-2">{title}</h2> : null}
      {description ? <p className="sd-block-desc mt-1">{description}</p> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx("sd-block sd-block-link", className)}>
        {inner}
      </Link>
    );
  }
  return <div className={cx("sd-block", className)}>{inner}</div>;
}
