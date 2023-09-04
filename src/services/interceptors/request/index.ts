import { AxiosRequestConfig } from "axios";
import { Session } from "../../../models/Session";

export const requestInterceptor = () => {
  const onSuccess = async (request: AxiosRequestConfig) => {
    const accessToken = await getAccessToken();

    if (request.headers) {
      request.headers.Authorization = accessToken;
    }

    return request;
  }

  async function getAccessToken(): Promise<string> {
    if (shouldUseAccessToken()) {
      return '';
    }

    const session = await new Session().get();
    return session?.current_account.access_token!;
  }

  function shouldUseAccessToken(): boolean {
    return false;
  }

  return { onSuccess }
}