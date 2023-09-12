import { useRejectedResponseInterceptor } from "./error";
import { useSuccessfullyResponse } from "./success";

export const responseInterceptor = () => {
  const { onErrorResponse } = useRejectedResponseInterceptor();
  const { onSuccessResponse } = useSuccessfullyResponse();

  return { onSuccessResponse, onErrorResponse };
}