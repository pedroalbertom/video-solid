import { Request, Response } from "express";
import { FastifyRequest, FastifyReply } from "fastify";
import { IProductController } from "./product.controller";
import { IProductService } from "../../services/product/product.service";
import { productService } from "../../util/service.factory";
import { getBody, sendResponse, getParams } from "../../util/http.functions";

export class ProductController implements IProductController {

    private constructor(readonly service: IProductService) { }

    public static build() {
        return new ProductController(productService);
    }

    public async create(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const body = getBody(req);
        const { name, price } = body;

        const output = await this.service.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        sendResponse(reply, 201, data);
    }

    public async list(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const output = await this.service.list();

        const data = {
            products: output.products,
        };

        sendResponse(reply, 200, data);
    }

    public async buy(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const params = getParams(req);
        const body = getBody(req);
        const { amount } = body;

        const output = await this.service.buy(params.id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        sendResponse(reply, 200, data);
    }

    public async sell(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const params = getParams(req);
        const body = getBody(req);
        const { amount } = body;

        const output = await this.service.sell(params.id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        sendResponse(reply, 200, data);
    }
}
