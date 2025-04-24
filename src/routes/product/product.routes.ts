import { Api } from "../../api/api";
import { ApiExpress } from "../../api/express/api.express";
import { ApiFastify } from "../../api/fastify/api.fastify";
import { IProductController } from "../../controllers/product/product.controller";
import { ProductController } from "../../controllers/product/product.controller.implementation";

async function registerProductRoutes(api: Api, controller: IProductController) {
    await api.addPostRoute("/products", controller.create.bind(controller));
    await api.addPostRoute("/products/:id/buy", controller.buy.bind(controller));
    await api.addPostRoute("/products/:id/sell", controller.sell.bind(controller));
    await api.addGetRoute("/products", controller.list.bind(controller));
}

export async function registerProductRoutesExpress(api: ApiExpress) {
    const controller = ProductController.build();
    await registerProductRoutes(api, controller);
}

export async function registerProductRoutesFastify(api: ApiFastify) {
    const controller = ProductController.build();
    await registerProductRoutes(api, controller);
}
