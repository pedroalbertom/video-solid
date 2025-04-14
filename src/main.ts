import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";

async function main() {
    const api = ApiExpress.build()

    const controller = ProductController.build()

    await api.addGetRoute("/products", controller.list)
    await api.addPostRoute("/products/:id/buy", controller.buy)
    await api.addPostRoute("/products/:id/sell", controller.sell)
    await api.addPostRoute("/products/create", controller.create)

    await api.start(8000)
}

main()