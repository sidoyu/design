import { cx } from "./cx";

/**
 * 버튼. variant 2종(solid/ghost)·size 2단(md/sm) 외 추가 금지 —
 * 새 변형이 필요해 보이면 먼저 docs/DESIGN.md의 컴포넌트 절을 갱신한 뒤 추가한다.
 */
type ButtonStyleProps = {
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
};

const VARIANT_CLASS = {
  solid: "bg-ink text-surface hover:bg-ink/80",
  ghost: "bg-surface-subtle hover:bg-brand-hover",
} as const;

const SIZE_CLASS = {
  md: "h-10 px-4 text-sm",
  sm: "h-8 px-3 text-xs",
} as const;

function buttonClass({ variant = "solid", size = "md" }: ButtonStyleProps, className?: string) {
  return cx(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors brand-ring disabled:pointer-events-none disabled:opacity-40",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className
  );
}

type ButtonProps = React.ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type, ...props }: ButtonProps) {
  return <button type={type ?? "button"} className={buttonClass({ variant, size }, className)} {...props} />;
}

/** 버튼처럼 보이는 링크 (다운로드·외부 링크 등). */
type ButtonLinkProps = React.ComponentProps<"a"> & ButtonStyleProps;

export function ButtonLink({ variant = "ghost", size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClass({ variant, size }, className)} {...props} />;
}
