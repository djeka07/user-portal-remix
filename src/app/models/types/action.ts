export class Response {
  ok: boolean;
  constructor(ok: boolean) {
    this.ok = ok;
  }
}

export class SuccessResponse<T = never> extends Response {
  data?: T;
  constructor(data?: T) {
    super(true);
    this.data = data;
  }
}

export class FailResponse<T = never> extends Response {
  errors?: T;
  constructor(errors?: T) {
    super(false);
    this.errors = errors;
  }
}

export type ActionResponse<TSuccess, TFailure> = SuccessResponse<TSuccess> | FailResponse<TFailure>;
