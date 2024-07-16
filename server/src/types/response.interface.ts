import { Response } from "express";

interface ResponseT<T = null> extends Partial<Response> {
  data: T;
  success: boolean;
  error: boolean;
  message: string;
  statusCode: number;
}

export default ResponseT;
