import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../util/prisma.util";
import { ProductRepositoryPrisma } from "../../repositories/product/product.repository.prisma";
import { ProductService } from "../../services/product/product.service.implementation";
import { IProductController } from "./product.controller";

export class ProductControllerFastify implements IProductController {

    private constructor() { }

    public static build() {
        return new ProductControllerFastify();
    }

    public async create(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { name, price } = req.body as { name: string; price: number };

        const output = await aService.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        reply.code(201).send(data);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const output = await aService.list();

        const data = {
            products: output.products,
        };

        reply.code(200).send(data);
    }

    public async buy(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { id } = req.params as { id: string };
        const { amount } = req.body as { amount: number };

        const output = await aService.buy(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        reply.code(200).send(data);
    }

    public async sell(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { id } = req.params as { id: string };
        const { amount } = req.body as { amount: number };

        const output = await aService.sell(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        reply.code(200).send(data);
    }
}
