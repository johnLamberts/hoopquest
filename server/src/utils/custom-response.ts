import ResponseT from "@/types/response.interface";

const customResponse = <T>({
  data,
  success,
  error,
  message,
  statusCode,
  status,
}: ResponseT<T>) => {
  return {
    data,
    success,
    error,
    message,
    statusCode,
    status,
  };
};

export default customResponse;
