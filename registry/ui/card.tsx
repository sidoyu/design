// sidoyu-design v0.16.0 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
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

/**
 * 앱 화면 주소인가(v0.15.2) — 아니면 Next.js 링크 대신 일반 <a> 로 그린다.
 * Next.js 링크는 화면에 보이면 대상 화면을 미리 불러오는데(?_rsc= 요청), public/ 의 정적 파일에는 그 요청을 받을
 * 화면이 없어 404 가 난다(sidoyu.com /ai 의 /ai-notes/*.html 실측). 앱 화면이 아니라고 보는 주소 = 다른 사이트
 * (https:·mailto: 같은 scheme, //) · 마지막 경로 조각이 확장자로 끝나는 파일(/ai-notes/x.html · /cv.pdf).
 * 판정은 주소 모양만 보므로 양쪽으로 틀릴 수 있다: 앱 화면을 일반 링크로 보면(/release/1.2 · 같은 사이트의 절대 주소)
 * 이동은 되고 화면 전체를 새로 받는다 · 확장자 없는 파일이나 바깥으로 재작성되는 경로를 앱 화면으로 보면 이 404 가 다시 난다.
 * 카드의 href 는 / 로 시작하는 주소로 쓴다(상대 경로는 카드가 놓인 화면에 따라 목적지가 달라진다).
 */
function isAppRoute(href: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return false;
  const path = href.split(/[?#]/, 1)[0];
  const last = path.slice(path.lastIndexOf("/") + 1);
  return !/\.[a-z0-9]+$/i.test(last);
}

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
    const cls = cx("sd-block sd-block-link", className);
    if (!isAppRoute(href)) {
      return (
        <a href={href} className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return <div className={cx("sd-block", className)}>{inner}</div>;
}
