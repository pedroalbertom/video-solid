import { ApiExpress } from "../express/api.express";
import { ProductController } from "../express/controllers/product.controller";

export async function registerProductRoutes(api: ApiExpress) {
    const controller = ProductController.build();

    await api.addPostRoute("/products", controller.create);
    await api.addPostRoute("/products/:id/buy", controller.buy);
    await api.addPostRoute("/products/:id/sell", controller.sell);
    await api.addGetRoute("/products", controller.list);
}
