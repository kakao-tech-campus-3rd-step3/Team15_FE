export class ApiError extends Error {
  public status: number;
  public body?: unknown;
  constructor(status: number, body?: unknown, message?: string) {
    super(message ?? `API Error: ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}
