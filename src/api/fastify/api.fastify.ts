import { Api } from "../api";
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export class ApiFastify implements Api {
    private constructor(private readonly app: FastifyInstance) { }

    public static build(): ApiFastify {
        const app = Fastify();
        app.register(require('@fastify/formbody'));
        return new ApiFastify(app);
    }

    public async addGetRoute(path: string, handle: (req: FastifyRequest, reply: FastifyReply) => Promise<void>): Promise<void> {
        this.app.get(path, async (req, reply) => {
            await handle(req, reply);
        });
    }

    public async addPostRoute(path: string, handle: (req: FastifyRequest, reply: FastifyReply) => Promise<void>): Promise<void> {
        this.app.post(path, async (req, reply) => {
            await handle(req, reply);
        });
    }

    public async addPutRoute(path: string, handle: (req: FastifyRequest, reply: FastifyReply) => Promise<void>): Promise<void> {
        this.app.put(path, async (req, reply) => {
            await handle(req, reply);
        });
    }

    public async addDeleteRoute(path: string, handle: (req: FastifyRequest, reply: FastifyReply) => Promise<void>): Promise<void> {
        this.app.delete(path, async (req, reply) => {
            await handle(req, reply);
        });
    }

    public async start(port: number): Promise<void> {
        try {
            await this.app.listen({ port });
            console.log(`🚀 Fastify server running on port ${port}`);
            this.printRoutes();
        } catch (err) {
            console.error("Erro ao iniciar o Fastify:", err);
            process.exit(1);
        }
    }

    private printRoutes() {
        console.log("📡 Rotas registradas:");
        this.app.printRoutes();
    }
}
