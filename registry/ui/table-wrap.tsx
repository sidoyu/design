// sidoyu-design v0.8.1 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
import { cx } from "./cx";

/**
 * 넓은 표의 가로 스크롤 상자(모양 = base.css .sd-table-wrap, v0.7.0 신설).
 * 키보드로도 스크롤할 수 있게 tabIndex=0 + role="region" + 이름(label)을 묶어서 준다 — 하나라도 빠지면 접근성이 깨진다.
 * 본문 열 폭을 넘을 수 있는 표는 모두 이 상자 안에 둔다. 표 자체는 <table className="sd-table"> 를 그대로 쓴다.
 */
type TableWrapProps = {
  /** 화면낭독기가 읽는 상자 이름(예: "모델별 사용량") */
  label: string;
  className?: string;
  children: React.ReactNode;
};

export function TableWrap({ label, className, children }: TableWrapProps) {
  return (
    <div className={cx("sd-table-wrap", className)} tabIndex={0} role="region" aria-label={label}>
      {children}
    </div>
  );
}
