export class CustomsExceptions extends Error {
  status_exception: number;
  data: unknown;

  constructor(message: string, data: unknown, status: number) {
    super(message);
    this.stack = "";
    this.status_exception = status;
    this.data = data;
  }
}
