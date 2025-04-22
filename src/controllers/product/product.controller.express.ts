import { Request, Response } from "express";
import { IProductController } from "./product.controller";
import { IProductService } from "../../services/product/product.service";
import { productService } from "../../util/repository.factory";

export class ProductControllerExpress implements IProductController {

    private constructor(readonly service: IProductService) { }

    public static build() {
        return new ProductControllerExpress(productService);
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
