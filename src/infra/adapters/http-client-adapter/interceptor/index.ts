import { useRejectedResponseInterceptor } from "./error-response"
import { useSuccessfullyResponse } from "./success-response"
import { requestInterceptor } from "./success-request"

export function useNetworkInterceptor() {
    const onRequest = requestInterceptor()
    const { onSuccess } = useSuccessfullyResponse()
    const { onFailure } = useRejectedResponseInterceptor()

    return {
        onRequest,
        onResponse: { onSuccess, onFailure }
    }
}