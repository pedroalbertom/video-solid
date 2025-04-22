import { ApiExpress } from "../api/express/api.express";
import { UserController } from "../api/express/controllers/user.controller";

export async function registerUserRoutes(api: ApiExpress) {
    const controller = UserController.build();

    await api.addPostRoute("/users", controller.create);
    await api.addGetRoute("/users", controller.list);
    await api.addPutRoute("/users/:id", controller.update);
    await api.addDeleteRoute("/users/:id", controller.delete);
}
