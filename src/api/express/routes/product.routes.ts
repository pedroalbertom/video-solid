import { ApiExpress } from "../api.express";
import { ProductController } from "../controllers/product.controller";

export async function registerProductRoutes(api: ApiExpress) {
    const controller = ProductController.build();

    await api.addPostRoute("/products", controller.create);
    await api.addPostRoute("/products/:id/buy", controller.buy);
    await api.addPostRoute("/products/:id/sell", controller.sell);
    await api.addGetRoute("/products", controller.list);
}
