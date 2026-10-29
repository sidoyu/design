// sidoyu-design v0.7.1 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
import { cx } from "./cx";

/**
 * 입력 필드(모양 = base.css .sd-field). 입력류 마크업을 인라인으로 복제하지 말 것.
 * 오류 = aria-invalid="true"(테두리만 오류색) + .sd-error-msg 문구의 id 를 aria-describedby 로 연결(DESIGN §6).
 */
type InputProps = React.ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return <input className={cx("sd-field", className)} {...props} />;
}

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cx("sd-field", className)} {...props} />;
}
