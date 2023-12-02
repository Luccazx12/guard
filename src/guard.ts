import { GuardException } from './guard-exception';

/**
 * Utility class for common guard clauses.
 */
export class Guard {
  /**
   * Checks if a value is empty.
   * @param value - The value to check.
   * @returns True if the value is empty, false otherwise.
   */
  // eslint-disable-next-line complexity
  public static isEmpty(value: unknown): value is undefined | null {
    if (this.isNullOrUndefined(value)) {
      return true;
    }

    if (this.isString(value) || this.isArray(value)) {
      return value.length === 0;
    }

    if (this.isObject(value)) {
      return Object.keys(value).length === 0;
    }

    return false;
  }

  /**
   * Checks if a number, string, or array length is between a specified range.
   * @param value - The value to check.
   * @param min - The minimum allowed value.
   * @param max - The maximum allowed value.
   * @returns True if the value is between the specified range, false otherwise.
   * @throws {GuardException} Throws an exception if the provided min is greater than max.
   * @throws {GuardException} Throws an exception if the value is empty.
   */
  // eslint-disable-next-line complexity
  public static isBetween(
    value: number | string | unknown[],
    min: number,
    max: number,
  ): boolean {
    if (min > max)
      throw new GuardException(`Max ${max} should be greater than min ${min}.`);

    if (Guard.isEmpty(value)) {
      throw new GuardException(
        'Cannot check length of a value. Provided value is empty',
      );
    }

    const valueLength = this.isNumber(value) ? value : String(value).length;

    return valueLength >= min && valueLength <= max;
  }

  private static isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  private static isNullOrUndefined(value: unknown): value is undefined | null {
    return value === null || value === undefined;
  }

  private static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  private static isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  private static isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
