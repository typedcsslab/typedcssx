export function union(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}
