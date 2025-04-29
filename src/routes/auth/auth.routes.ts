import { Api } from "../../api/api"
import { ApiExpress } from "../../api/express/api.express"
import { ApiFastify } from "../../api/fastify/api.fastify"
import { IAuthController } from "../../controllers/auth/auth.controller"
import { AuthController } from "../../controllers/auth/auth.controller.implementation"
import { authMiddleware } from "../../middlewares/auth"

async function registerAuthRoutes(api: Api, controller: IAuthController) {
    await api.addPostRoute("/login", controller.login.bind(controller))
    await api.addPostRoute("/logout", controller.logout.bind(controller), authMiddleware)
}

const controller = AuthController.build()

export async function registerAuthRoutesExpress(api: ApiExpress) {
    await registerAuthRoutes(api, controller)
}

export async function registerAuthRoutesFastify(api: ApiFastify) {
    await registerAuthRoutes(api, controller)
}
