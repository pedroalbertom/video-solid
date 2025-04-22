import { ApiExpress } from "../api.express";
import { registerProductRoutes } from "./product.routes";
import { registerUserRoutes } from "./user.routes";

export async function registerRoutes(api: ApiExpress) {
    await registerProductRoutes(api);
    await registerUserRoutes(api);
}
