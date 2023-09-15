import axios, { AxiosInstance } from "axios";
import { IHttpClient } from "./index.gateway"

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

    async get<Res>(url: string): Promise<Res> {
        const { data } = await this.client.get<Res>(url)
        return data
    }

    async post<Req, Res>(body: Req, url: string): Promise<Res> {
        const { data } = await this.client.post<Res>(url, body)
        return data
    }

    async put<Req, Res>(body: Req, url: string): Promise<Res> {
        const { data } = await this.client.put<Res>(url, body)
        return data
    }

    async delete<Res>(url: string): Promise<Res> {
        const { data } = await this.client.delete<Res>(url)
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