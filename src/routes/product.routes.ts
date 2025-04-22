import { ApiExpress } from "../api/express/api.express";
import { ApiFastify } from "../api/fastify/api.fastify";
import { ProductControllerExpress } from "../api/express/controllers/product.controller";
import { ProductControllerFastify } from "../api/fastify/controllers/product.controller";

export async function registerProductRoutesExpress(api: ApiExpress) {
    const controller = ProductControllerExpress.build();

    await api.addPostRoute("/products", controller.create);
    await api.addPostRoute("/products/:id/buy", controller.buy);
    await api.addPostRoute("/products/:id/sell", controller.sell);
    await api.addGetRoute("/products", controller.list);
}

export async function registerProductRoutesFastify(api: ApiFastify) {
    const controller = ProductControllerFastify.build();

    await api.addPostRoute("/products", controller.create);
    await api.addPostRoute("/products/:id/buy", controller.buy);
    await api.addPostRoute("/products/:id/sell", controller.sell);
    await api.addGetRoute("/products", controller.list);
}
