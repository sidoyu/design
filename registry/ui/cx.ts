/** className 조합 헬퍼. 외부 의존성(clsx 등) 대신 사용. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
