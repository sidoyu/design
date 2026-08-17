import { cx } from "./cx";

/**
 * 모든 페이지의 최상위 틀. 새 페이지는 반드시 PageShell부터 시작한다.
 * 바깥 틀은 항상 wide 중앙 배치 — 모든 페이지의 본문이 헤더와 같은 왼쪽 기준선에서 시작한다.
 * width는 컨테이너 위치가 아니라 줄 길이(measure) 상한: reading/narrow는 왼쪽 정렬로 폭만 제한.
 * 폭 3종 외 다른 max-w 금지, 페이지 패딩(px-6 pt-6 pb-14) 임의 변경 금지.
 */
type PageShellProps = {
  /** wide=카드 그리드·표(홈류) · reading=글/리스트/대시보드 · narrow=폼 */
  width?: "wide" | "reading" | "narrow";
  className?: string;
  children: React.ReactNode;
};

const WIDTH_CLASS = {
  wide: undefined,
  reading: "max-w-reading",
  narrow: "max-w-narrow",
} as const;

export function PageShell({ width = "reading", className, children }: PageShellProps) {
  const inner = cx(WIDTH_CLASS[width], className);
  return (
    <main className="mx-auto w-full max-w-wide px-6 pt-6 pb-14">
      <div className={inner || undefined}>{children}</div>
    </main>
  );
}
