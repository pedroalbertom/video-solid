import { ApiExpress } from "../api/api.express";
import { ApiFastify } from "../api/api.fastify";
import { ProductControllerExpress } from "../controllers/product/product.controller.express";
import { ProductControllerFastify } from "../controllers/product/product.controller.fastify";

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
