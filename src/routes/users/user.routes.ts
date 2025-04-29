import { Api } from "../../api/api"
import { ApiExpress } from "../../api/express/api.express"
import { ApiFastify } from "../../api/fastify/api.fastify"
import { IUserController } from "../../controllers/users/user.controller"
import { UserController } from "../../controllers/users/user.controller.implementation"

async function registerUserRoutes(api: Api, controller: IUserController) {
    await api.addPostRoute("/users", controller.create.bind(controller))
    await api.addGetRoute("/users", controller.list.bind(controller))
    await api.addPutRoute("/users/:id", controller.update.bind(controller))
    await api.addDeleteRoute("/users/:id", controller.delete.bind(controller))
}

const controller = UserController.build()

export async function registerUserRoutesExpress(api: ApiExpress) {
    await registerUserRoutes(api, controller)
}

export async function registerUserRoutesFastify(api: ApiFastify) {
    await registerUserRoutes(api, controller)
}
