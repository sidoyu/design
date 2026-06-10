import { cx } from "./cx";

/** 입력 필드 공통 스타일. 입력류 마크업을 인라인으로 복제하지 말 것. */
const FIELD_CLASS =
  "w-full rounded-control border border-line bg-transparent px-3 py-2 text-sm placeholder:text-ink-faint brand-ring";

type InputProps = React.ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return <input className={cx(FIELD_CLASS, className)} {...props} />;
}

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cx(FIELD_CLASS, "min-h-28 resize-y", className)} {...props} />;
}
