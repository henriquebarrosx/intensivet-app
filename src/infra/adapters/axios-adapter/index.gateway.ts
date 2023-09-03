export interface IHttpClient {
    get<Res>(url: string): Promise<Res>
    post<Req, Res>(url: string, body: Req): Promise<Res>
    put<Req, Res>(url: string, body: Req): Promise<Res>
    destroy<Res>(url: string): Promise<Res>
}