import { Api } from "../api";
import express, { Express, Request, Response } from 'express'

export class ApiExpress implements Api {

    private constructor(readonly app: Express) { }

    public static build() {
        const app = express()
        app.use(express.json())
        return new ApiExpress(app)
    }

    public async addGetRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): Promise<void> {
        this.app.get(path, handle)
    }

    public async addPostRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): Promise<void> {
        this.app.post(path, handle)
    }

    public async addPutRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): Promise<void> {
        this.app.put(path, handle)
    }

    public async addDeleteRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): Promise<void> {
        this.app.delete(path, handle)
    }

    public async start(port: number): Promise<void> {
        try {
            this.app.listen({ port });
            console.log(`🚀 Express server running on port ${port}`);
            // this.printRoutes();
        } catch (err) {
            console.error("Erro ao iniciar o Express:", err);
            process.exit(1);
        }
    }

    private printRoutes() {
        const routes = this.app.router.stack
            .filter((route: any) => route.route)
            .map((route: any) => ({
                path: route.route.path,
                method: route.route.stack[0].method
            }))

        console.log(routes)
    }
}