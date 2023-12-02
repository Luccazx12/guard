import { ExceptionBase } from "@luccazx12/exceptions-base";

export class GuardException extends ExceptionBase {
  public readonly code: string = "GUARD_EXCEPTION";

  constructor(message: string) {
    super({ message });
  }
}
