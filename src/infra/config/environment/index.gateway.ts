export interface IEnvironment {
    name: "production" | "staging" | "development"
    sentry: {
        dsn: string
        env: "production" | "staging" | "development"
    }
    httpClientBaseUrl: string
    pusherjsAppKey: string
}