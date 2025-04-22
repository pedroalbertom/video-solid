import { ApiExpress } from "../api/api.express";
import { ApiFastify } from "../api/api.fastify";
import { UserControllerExpress } from "../controllers/users/user.controller.express";
import { UserControllerFastify } from "../controllers/users/user.controller.fastify";

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
