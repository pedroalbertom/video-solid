import { ApiExpress } from "../../api/express/api.express";
import { ApiFastify } from "../../api/fastify/api.fastify";
import { UserControllerExpress } from "../../controllers/users/express/user.controller.express";
import { UserControllerFastify } from "../../controllers/users/fastify/user.controller.fastify";

export async function registerUserRoutesExpress(api: ApiExpress) {
    const controller = UserControllerExpress.build();

    await api.addPostRoute("/users", controller.create.bind(controller));
    await api.addGetRoute("/users", controller.list.bind(controller));
    await api.addPutRoute("/users/:id", controller.update.bind(controller));
    await api.addDeleteRoute("/users/:id", controller.delete.bind(controller));
}

export async function registerUserRoutesFastify(api: ApiFastify) {
    const controller = UserControllerFastify.build();

    await api.addPostRoute("/users", controller.create.bind(controller));
    await api.addGetRoute("/users", controller.list.bind(controller));
    await api.addPutRoute("/users/:id", controller.update.bind(controller));
    await api.addDeleteRoute("/users/:id", controller.delete.bind(controller));
}
