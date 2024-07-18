import ResponseT from "./response.interface";

export interface ErrorReponse extends ResponseT {
  stack?: string;
}

export default ErrorReponse;
