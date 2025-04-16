import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";
import { registerRoutes } from "./api/express/routes";

async function main() {
    const api = ApiExpress.build()

    await registerRoutes(api)

    await api.start(8000)
}

main()