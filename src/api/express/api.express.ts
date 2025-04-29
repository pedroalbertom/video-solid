import { Api } from "../api"
import express, { Express, Request, Response, NextFunction } from 'express'

export class ApiExpress implements Api {

    private constructor(readonly app: Express) { }

    public static build() {
        const app = express()
        app.use(express.json())
        return new ApiExpress(app)
    }

    public async addGetRoute(
        path: string,
        handle: (req: Request, res: Response) => Promise<void>,
        middleware?: (req: Request, res: Response, next: NextFunction) => void
    ): Promise<void> {
        if (middleware) {
            this.app.get(path, middleware, handle)
        } else {
            this.app.get(path, handle)
        }
    }

    public async addPostRoute(
        path: string,
        handle: (req: Request, res: Response) => Promise<void>,
        middleware?: (req: Request, res: Response, next: NextFunction) => void
    ): Promise<void> {
        if (middleware) {
            this.app.post(path, middleware, handle)
        } else {
            this.app.post(path, handle)
        }
    }

    public async addPutRoute(
        path: string,
        handle: (req: Request, res: Response) => Promise<void>,
        middleware?: (req: Request, res: Response, next: NextFunction) => void
    ): Promise<void> {
        if (middleware) {
            this.app.put(path, middleware, handle)
        } else {
            this.app.put(path, handle)
        }
    }

    public async addDeleteRoute(
        path: string,
        handle: (req: Request, res: Response) => Promise<void>,
        middleware?: (req: Request, res: Response, next: NextFunction) => void
    ): Promise<void> {
        if (middleware) {
            this.app.delete(path, middleware, handle)
        } else {
            this.app.delete(path, handle)
        }
    }

    public async start(port: number): Promise<void> {
        try {
            this.app.listen({ port })
            console.log(`🚀 Express server running on port ${port}`)
        } catch (err) {
            console.error("Erro ao iniciar o Express:", err)
            process.exit(1)
        }
    }

    private printRoutes() {
        const routes = this.app._router.stack
            .filter((layer: any) => layer.route)
            .map((layer: any) => ({
                path: layer.route.path,
                method: Object.keys(layer.route.methods)[0]
            }))
        console.log(routes)
    }
}
