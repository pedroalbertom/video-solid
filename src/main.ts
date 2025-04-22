import { ApiExpress } from "./api/express/api.express";
import { registerRoutes } from "./api/express/routes/routes";

async function main() {
    const api = ApiExpress.build()

    await registerRoutes(api)

    await api.start(8000)
}

main()