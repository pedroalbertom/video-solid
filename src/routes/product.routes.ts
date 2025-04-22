import { ApiExpress } from "../api/api.express";
import { ApiFastify } from "../api/api.fastify";
import { ProductControllerExpress } from "../controllers/product/product.controller.express";
import { ProductControllerFastify } from "../controllers/product/product.controller.fastify";

export async function registerProductRoutesExpress(api: ApiExpress) {
    const controller = ProductControllerExpress.build();

    await api.addPostRoute("/products", controller.create.bind(controller));
    await api.addPostRoute("/products/:id/buy", controller.buy.bind(controller));
    await api.addPostRoute("/products/:id/sell", controller.sell.bind(controller));
    await api.addGetRoute("/products", controller.list.bind(controller));
}

export async function registerProductRoutesFastify(api: ApiFastify) {
    const controller = ProductControllerFastify.build();

    await api.addPostRoute("/products", controller.create.bind(controller));
    await api.addPostRoute("/products/:id/buy", controller.buy.bind(controller));
    await api.addPostRoute("/products/:id/sell", controller.sell.bind(controller));
    await api.addGetRoute("/products", controller.list.bind(controller));
}
