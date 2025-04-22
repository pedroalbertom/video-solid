import { ApiExpress } from "./api/api.express";
import { ApiFastify } from "./api/api.fastify";
import { registerRoutesExpress, registerRoutesFastify } from "./routes/routes";

async function main() {
    const apiExpress = ApiExpress.build()
    const apiFastify = ApiFastify.build()

    await registerRoutesExpress(apiExpress)
    await registerRoutesFastify(apiFastify)

    await apiExpress.start(8000)
    await apiFastify.start(8001)
}

main()