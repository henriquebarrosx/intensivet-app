import { SessionService } from "../services/session"
import { AxiosAdapter } from "../adapters/axios-adapter"

export const httpClient = new AxiosAdapter()
export const sessionService = new SessionService(httpClient)