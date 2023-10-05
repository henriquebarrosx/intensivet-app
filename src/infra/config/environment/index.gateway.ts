export interface IEnvironment {
    name: EnvName
    pusherjsAppKey: string
    httpClientBaseUrl: string
    sentry: { dsn: string; env: EnvName }
}

export type EnvName = "production" | "staging" | "development"
