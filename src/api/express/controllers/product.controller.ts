import { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma";
import { prisma } from "../../../util/prisma.util";
import { ProductService } from "../../../services/product/implementation/product.service.implementation";

export class ProductController {
    private service: ProductService;

    private constructor(service: ProductService) {
        this.service = service;
    }

    public static build() {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductService.build(aRepository);
        return new ProductController(aService);
    }

    public async create(req: Request, res: Response) {
        const { name, price } = req.body;

        const output = await this.service.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        res.status(201).json(data);
    }

    public async list(req: Request, res: Response) {
        const output = await this.service.list();

        const data = {
            products: output.products,
        };

        res.status(200).json(data);
    }

    public async buy(req: Request, res: Response) {
        const { id } = req.params;
        const { amount } = req.body;

        const output = await this.service.buy(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        res.status(200).json(data);
    }

    public async sell(req: Request, res: Response) {
        const { id } = req.params;
        const { amount } = req.body;

        const output = await this.service.sell(id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        res.status(200).json(data);
    }
}
