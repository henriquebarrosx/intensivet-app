export interface IHttpClient {
    get<Res>(url: string, config?: Config): Promise<Res>
    post<Req, Res>(url: string, body: Req, config?: Config): Promise<Res>
    put<Req, Res>(url: string, body: Req, config?: Config): Promise<Res>
    delete<Res>(url: string, config?: Config): Promise<Res>
    configRequestIntercept(success?: any, rejected?: any): IHttpClient
    configResponseIntercept(success?: any, rejected?: any): IHttpClient
}

export type Config = {
    headers?: Headers
    onDownloadProgress?: () => void
}

type Headers = {
    "Content-Type": "text/plain" | "multipart/form-data" | "application/json" | "application/x-www-form-urlencoded"
}