export class StringUtils {
  static isEmpty(str: string): boolean {
    return !str || 0 === str.length;
  }

  static stringFormat(str: string, ...args: string[]): string {
    return str.replace(/{(\d+)}/g, (match, index) => args[index] || "");
  }
}
