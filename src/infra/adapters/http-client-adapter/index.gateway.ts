export interface IHttpClient {
    get<Res>(url: string): Promise<Res>
    post<Req, Res>(body: Req, url: string): Promise<Res>
    put<Req, Res>(body: Req, url: string): Promise<Res>
    delete<Res>(url: string): Promise<Res>
    configRequestIntercept(success?: any, rejected?: any): IHttpClient
    configResponseIntercept(success?: any, rejected?: any): IHttpClient
}