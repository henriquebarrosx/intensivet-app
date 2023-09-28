import axios, { AxiosInstance } from "axios";
import { Config, IHttpClient } from "./index.gateway"

export class AxiosAdapter implements IHttpClient {
    client: AxiosInstance

    constructor() {
        enum ENVIROMENT {
            STAGING = 'https://staging.intensivet.com.br',
            PRODUCTION = 'https://app.intensivet.com.br',
        }


        this.client = axios.create({
            baseURL: ENVIROMENT.STAGING
        })
    }

    async get<Res>(url: string, config?: Config): Promise<Res> {
        const { data } = await this.client.get<Res>(
            url,
            {
                onDownloadProgress: () => { config?.onDownloadProgress() },
                headers: config?.headers ? { "Content-Type": config.headers["Content-Type"] } : undefined
            }
        )

        return data
    }

    async post<Req, Res>(url: string, body: Req, config?: Config): Promise<Res> {
        const { data } = await this.client.post<Res>(
            url,
            body,
            {
                onDownloadProgress: () => { config?.onDownloadProgress() },
                headers: config?.headers ? { "Content-Type": config.headers["Content-Type"] } : undefined
            })

        return data
    }

    async put<Req, Res>(url: string, body: Req, config?: Config): Promise<Res> {
        const { data } = await this.client.put<Res>(
            url,
            body,
            {
                onDownloadProgress: () => { config?.onDownloadProgress() },
                headers: config?.headers ? { "Content-Type": config.headers["Content-Type"] } : undefined
            })

        return data
    }

    async delete<Res>(url: string, config?: Config): Promise<Res> {
        const { data } = await this.client.delete<Res>(
            url,
            {
                onDownloadProgress: () => { config?.onDownloadProgress() },
                headers: config?.headers ? { "Content-Type": config.headers["Content-Type"] } : undefined
            }
        )

        return data
    }

    configRequestIntercept(success?: any, rejected?: any): IHttpClient {
        this.client.interceptors.request.use(success, rejected)
        return this
    }

    configResponseIntercept(success?: any, rejected?: any): IHttpClient {
        this.client.interceptors.response.use(success, rejected)
        return this
    }
}