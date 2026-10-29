// sidoyu-design v0.7.2 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
import { cx } from "./cx";

/**
 * 버튼(모양 = base.css .sd-btn). variant 2종(solid/ghost)·size 2단(md/sm) 외 추가 금지 —
 * 새 변형이 필요해 보이면 먼저 docs/DESIGN.md의 컴포넌트 절을 갱신한 뒤 추가한다.
 * icon = 아이콘 전용 정사각(40/32) — 보이는 글자가 없으므로 aria-label 필수(v0.6.0).
 * 비활성은 네이티브 disabled 만 흐리게 한다. aria-disabled 를 쓰면 키보드 실행 차단은 호출부 몫이다.
 */
type ButtonStyleProps = {
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
};

type IconProps = { icon?: false } | { icon: true; "aria-label": string };

const VARIANT_CLASS = {
  solid: undefined,
  ghost: "sd-btn--ghost",
} as const;

const SIZE_CLASS = {
  md: undefined,
  sm: "sd-btn--sm",
} as const;

function buttonClass({ variant = "solid", size = "md" }: ButtonStyleProps, icon: boolean | undefined, className?: string) {
  return cx("sd-btn", VARIANT_CLASS[variant], SIZE_CLASS[size], icon && "sd-btn--icon", className);
}

type ButtonProps = Omit<React.ComponentProps<"button">, "aria-label"> & ButtonStyleProps & IconProps & { "aria-label"?: string };

export function Button({ variant, size, icon, className, type, ...props }: ButtonProps) {
  return <button type={type ?? "button"} className={buttonClass({ variant, size }, icon, className)} {...props} />;
}

/** 버튼처럼 보이는 링크 (다운로드·외부 링크 등). */
type ButtonLinkProps = Omit<React.ComponentProps<"a">, "aria-label"> & ButtonStyleProps & IconProps & { "aria-label"?: string };

export function ButtonLink({ variant = "ghost", size, icon, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClass({ variant, size }, icon, className)} {...props} />;
}
