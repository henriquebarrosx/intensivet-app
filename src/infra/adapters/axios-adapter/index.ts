import axios, { AxiosInstance } from "axios"
import { IHttpClient } from "./index.gateway"

export class AxiosAdapter implements IHttpClient {
    httpClient: AxiosInstance

    private ENVIROMENT = {
        STAGING: 'https://staging.intensivet.com.br',
        PRODUCTION: 'https://app.intensivet.com.br',
    }
    constructor() {

        this.httpClient = axios.create({
            baseURL: this.ENVIROMENT.STAGING,
        })
    }

    async get<Res>(url: string): Promise<Res> {
        const { data } = await this.httpClient.get<Res>(url)
        return data
    }

    async post<Req, Res>(url: string, body: Req): Promise<Res> {
        const { data } = await this.httpClient.post<Res>(url, body)
        return data
    }

    async put<Req, Res>(url: string, body: Req): Promise<Res> {
        const { data } = await this.httpClient.put<Res>(url, body)
        return data
    }

    async destroy<Res>(url: string): Promise<Res> {
        const { data } = await this.httpClient.delete<Res>(url)
        return data
    }
}