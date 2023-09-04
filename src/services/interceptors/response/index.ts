import { useBadfullyResponse } from "./error";
import { useSuccessfullyResponse } from "./success";

export const responseInterceptor = () => {
  const { onErrorResponse } = useBadfullyResponse();
  const { onSuccessResponse } = useSuccessfullyResponse();

  return { onSuccessResponse, onErrorResponse };
}