export class ServiceError {
  message: string;

  code: number;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
