import { registerRootComponent } from "expo"

import App from "./App"
import { injectServices } from "./src/context/ServicesContext"

registerRootComponent(
    injectServices(
        App
    )
)
