// sidoyu-design v0.7.4 — 모양 정본 = base.css 의 sd-* 클래스 (이 줄은 빌드가 갱신)
"use client";

import { useId } from "react";
import { cx } from "./cx";

/**
 * 택일 버튼 줄 — 값 선택(모양 = base.css .sd-tabs·.sd-tab, 탭과 같은 모양). v0.6.0 신설(sidoyu.com 실험 공통 조작물 승격).
 * 선택 = 잉크 2px 밑줄 + 굵게(브랜드로 선택을 표시하지 않는다). 토글 버튼(aria-pressed) 묶음이라 Tab·Enter·Space 로 조작한다.
 * 그룹 라벨 필수 — 앞 제목이 맥락을 주는 자리에서만 hideLabel 로 화면에서 숨긴다(화면낭독기에는 읽힌다).
 * 선택지는 7개 상한(5개를 넘으면 select.sd-field 를 먼저 검토한다). 내용 전환(탭)은 이 부품이 아니라 role="tablist" + 방향키를 호출부가 소유한다.
 */
type SegmentedProps<T extends string> = {
  label: string;
  hideLabel?: boolean;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  className?: string;
};

export function Segmented<T extends string>({ label, hideLabel = false, value, options, onChange, className }: SegmentedProps<T>) {
  const labelId = useId();
  return (
    <div className={className}>
      <p id={labelId} className={hideLabel ? "sd-vh" : "sd-label"}>
        {label}
      </p>
      <div role="group" aria-labelledby={labelId} className={cx("sd-tabs", !hideLabel && "mt-1")}>
        {options.map((o) => (
          <button key={o.value} type="button" className="sd-tab" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
