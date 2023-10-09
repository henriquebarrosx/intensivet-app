import { IEnvironment } from "./index.gateway"

const DEVELOPMENT: IEnvironment = {
    name: "development",
    httpClientBaseUrl: "https://staging.intensivet.com.br",
    pusherjsAppKey: "3e8071ca178d120546a5",
    sentry: {
        dsn: "",
        env: "development",
    }
}

const STAGING: IEnvironment = {
    name: "staging",
    httpClientBaseUrl: "https://staging.intensivet.com.br",
    pusherjsAppKey: "3e8071ca178d120546a5",
    sentry: {
        dsn: "https://d0bb3ec74543499e774342cb20a4d7e0@o4505966712979456.ingest.sentry.io/4505969606721536",
        env: "staging",
    }
}

const PRODUCTION: IEnvironment = {
    name: "production",
    httpClientBaseUrl: "https://app.intensivet.com.br",
    pusherjsAppKey: "f63932033b491e9d4a9f",
    sentry: {
        dsn: "https://d0bb3ec74543499e774342cb20a4d7e0@o4505966712979456.ingest.sentry.io/4505969606721536",
        env: "production",
    }
}

export const env: IEnvironment = STAGING
