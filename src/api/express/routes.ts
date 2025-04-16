import { ApiExpress } from "./api.express";
import { ProductController } from "./controllers/product.controller";
import { UserController } from "./controllers/user.controller";

export async function registerRoutes(api: ApiExpress) {
    const productController = ProductController.build()

    await api.addPostRoute("/products/create", productController.create)
    await api.addPostRoute("/products/:id/buy", productController.buy)
    await api.addPostRoute("/products/:id/sell", productController.sell)
    await api.addGetRoute("/products", productController.list)

    const userController = UserController.build()

    await api.addPostRoute("/products/create", userController.create)
    await api.addGetRoute("/products", userController.list)
    await api.addPutRoute("/products/:id", userController.update)
    await api.addDeleteRoute("/products/:id", userController.delete)
}
