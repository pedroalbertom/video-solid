import { ApiExpress } from "../api/express/api.express";
import { ApiFastify } from "../api/fastify/api.fastify";
import { UserControllerExpress } from "../api/express/controllers/user.controller";
import { UserControllerFastify } from "../api/fastify/controllers/user.controller";

export async function registerUserRoutesExpress(api: ApiExpress) {
    const controller = UserControllerExpress.build();

    await api.addPostRoute("/users", controller.create);
    await api.addGetRoute("/users", controller.list);
    await api.addPutRoute("/users/:id", controller.update);
    await api.addDeleteRoute("/users/:id", controller.delete);
}

export async function registerUserRoutesFastify(api: ApiFastify) {
    const controller = UserControllerFastify.build();

    await api.addPostRoute("/users", controller.create);
    await api.addGetRoute("/users", controller.list);
    await api.addPutRoute("/users/:id", controller.update);
    await api.addDeleteRoute("/users/:id", controller.delete);
}
