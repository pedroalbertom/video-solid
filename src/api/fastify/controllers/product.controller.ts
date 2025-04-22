import { FastifyRequest, FastifyReply } from "fastify";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma";
import { prisma } from "../../../util/prisma.util";
import { ProductService } from "../../../services/product/implementation/product.service.implementation";

export class ProductControllerFastify {

    private constructor(private service: ProductService) { }

    public static build() {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);
        return new ProductControllerFastify(aService);
    }

    public async create(req: FastifyRequest, reply: FastifyReply) {
        const { name, price } = req.body as { name: string; price: number };

        const output = await this.service.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        reply.code(201).send(data);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const output = await this.service.list();

        const data = {
            products: output.products,
        };

        reply.code(200).send(data);
    }

    public async buy(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };
        const { amount } = req.body as { amount: number };

        const output = await this.service.buy(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        reply.code(200).send(data);
    }

    public async sell(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };
        const { amount } = req.body as { amount: number };

        const output = await this.service.sell(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        reply.code(200).send(data);
    }
}
