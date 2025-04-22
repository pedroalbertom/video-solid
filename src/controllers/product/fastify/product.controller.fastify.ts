import { FastifyRequest, FastifyReply } from "fastify";
import { IProductController } from "../product.controller";
import { IProductService } from "../../../services/product/product.service";
import { productService } from "../../../util/service.factory";

export class ProductControllerFastify implements IProductController {

    private constructor(readonly service: IProductService) { }

    public static build() {
        return new ProductControllerFastify(productService);
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
