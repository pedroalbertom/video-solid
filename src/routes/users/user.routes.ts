import { Api } from "../../api/api";
import { ApiExpress } from "../../api/express/api.express";
import { ApiFastify } from "../../api/fastify/api.fastify";
import { UserControllerExpress } from "../../controllers/users/express/user.controller.express";
import { UserControllerFastify } from "../../controllers/users/fastify/user.controller.fastify";
import { IUserController } from "../../controllers/users/user.controller";

async function registerUserRoutes(api: Api, controller: IUserController) {
    await api.addPostRoute("/users", controller.create.bind(controller));
    await api.addGetRoute("/users", controller.list.bind(controller));
    await api.addPutRoute("/users/:id", controller.update.bind(controller));
    await api.addDeleteRoute("/users/:id", controller.delete.bind(controller));
}

export async function registerUserRoutesExpress(api: ApiExpress) {
    const controller = UserControllerExpress.build();
    await registerUserRoutes(api, controller);
}

export async function registerUserRoutesFastify(api: ApiFastify) {
    const controller = UserControllerFastify.build();
    await registerUserRoutes(api, controller);
}
