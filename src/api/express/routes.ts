import { ApiExpress } from "./api.express";
import { ProductController } from "./controllers/product.controller";
import { UserController } from "./controllers/user.controller";

export async function registerRoutes(api: ApiExpress) {
    const productController = ProductController.build()

    await api.addPostRoute("/products", productController.create)
    await api.addPostRoute("/products/:id/buy", productController.buy)
    await api.addPostRoute("/products/:id/sell", productController.sell)
    await api.addGetRoute("/products", productController.list)

    const userController = UserController.build()

    await api.addPostRoute("/users", userController.create)
    await api.addGetRoute("/users", userController.list)
    await api.addPutRoute("/users/:id", userController.update)
    await api.addDeleteRoute("/users/:id", userController.delete)
}
