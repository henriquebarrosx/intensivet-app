export interface IEnvironment {
    name: "production" | "staging"
    sentry: {
        dsn: string
        env: "production" | "staging"
    }
    httpClientBaseUrl: string
    pusherjsAppKey: string
}