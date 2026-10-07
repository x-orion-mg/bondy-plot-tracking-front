class HttpError extends Error {
  constructor(
    message: string,
    public code: number | undefined,
    public body: unknown
  ) {
    super(message);
  }
}

export {HttpError};
