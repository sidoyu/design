// sidoyu-design v0.7.2 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
import { cx } from "./cx";

/** 분류 꼬리표 전용(모양 = base.css .sd-badge). 상태를 말하지 않는다 — 상태는 .sd-status(DESIGN §6). */
type BadgeProps = React.ComponentProps<"span">;

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cx("sd-badge", className)} {...props} />;
}
