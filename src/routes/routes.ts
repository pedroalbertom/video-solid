import { ApiExpress } from "../api/express/api.express";
import { ApiFastify } from "../api/fastify/api.fastify";
import { registerProductRoutesExpress, registerProductRoutesFastify } from "./product.routes";
import { registerUserRoutesExpress, registerUserRoutesFastify } from "./user.routes";

export async function registerRoutesExpress(api: ApiExpress) {
    await registerProductRoutesExpress(api);
    await registerUserRoutesExpress(api);
}

export async function registerRoutesFastify(api: ApiFastify) {
    await registerProductRoutesFastify(api);
    await registerUserRoutesFastify(api);
}
