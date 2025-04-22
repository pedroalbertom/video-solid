import { Request, Response } from "express";
import { prisma } from "../../util/prisma.util";
import { ProductRepositoryPrisma } from "../../repositories/product/product.repository.prisma";
import { ProductService } from "../../services/product/product.service.implementation";
import { IProductController } from "./product.controller";

export class ProductControllerExpress implements IProductController {

    private constructor() { }

    public static build() {
        return new ProductControllerExpress();
    }

    public async create(req: Request, res: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { name, price } = req.body;

        const output = await aService.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        res.status(201).json(data);
    }

    public async list(req: Request, res: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const output = await aService.list();

        const data = {
            products: output.products,
        };

        res.status(200).json(data);
    }

    public async buy(req: Request, res: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { id } = req.params;
        const { amount } = req.body;

        const output = await aService.buy(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        res.status(200).json(data);
    }

    public async sell(req: Request, res: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);

        const { id } = req.params;
        const { amount } = req.body;

        const output = await aService.sell(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        res.status(200).json(data);
    }
}
