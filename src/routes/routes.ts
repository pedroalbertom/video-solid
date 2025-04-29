import { ApiExpress } from "../api/express/api.express"
import { ApiFastify } from "../api/fastify/api.fastify"
import { registerAuthRoutesExpress, registerAuthRoutesFastify } from "./auth/auth.routes"
import { registerProductRoutesExpress, registerProductRoutesFastify } from "./product/product.routes"
import { registerUserRoutesExpress, registerUserRoutesFastify } from "./users/user.routes"

export async function registerRoutesExpress(api: ApiExpress) {
    await registerProductRoutesExpress(api)
    await registerUserRoutesExpress(api)
    await registerAuthRoutesExpress(api)
}

export async function registerRoutesFastify(api: ApiFastify) {
    await registerProductRoutesFastify(api)
    await registerUserRoutesFastify(api)
    await registerAuthRoutesFastify(api)
}
