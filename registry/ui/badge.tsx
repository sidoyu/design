import { cx } from "./cx";

/** 상태·태그 배지. 의미 색상(빨강/노랑 등)을 늘리지 말 것 — 기본형 하나만. */
type BadgeProps = React.ComponentProps<"span">;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-xs text-ink-muted",
        className
      )}
      {...props}
    />
  );
}
