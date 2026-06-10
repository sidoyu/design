import { cx } from "./cx";

/**
 * 모든 페이지의 최상위 틀. 새 페이지는 반드시 PageShell부터 시작한다.
 * 폭 3종 외 다른 max-w 금지, 페이지 패딩(px-6 pt-6 pb-14) 임의 변경 금지.
 */
type PageShellProps = {
  /** wide=카드 그리드(홈류) · reading=글/리스트/대시보드 · narrow=폼 */
  width?: "wide" | "reading" | "narrow";
  className?: string;
  children: React.ReactNode;
};

const WIDTH_CLASS = {
  wide: "max-w-wide",
  reading: "max-w-reading",
  narrow: "max-w-narrow",
} as const;

export function PageShell({ width = "reading", className, children }: PageShellProps) {
  return (
    <main className={cx("mx-auto w-full px-6 pt-6 pb-14", WIDTH_CLASS[width], className)}>
      {children}
    </main>
  );
}
