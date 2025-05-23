/**
 * The purpose of this utility class is to be like the normal Error class,
 * but change the name property to the name of the class by default.
 */
export abstract class ExtendableError extends Error {
  public cause: unknown;
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    this.cause = options?.cause;
  }
}
