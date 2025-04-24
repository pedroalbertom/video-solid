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

    public async create(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const body = getBody(request);
        const { name, price } = body;

        const output = await this.service.create(name, price);

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance,
        };

        sendResponse(response, 201, data);
    }

    public async list(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const output = await this.service.list();

        const data = {
            products: output.products,
        };

        sendResponse(response, 200, data);
    }

    public async buy(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const params = getParams(request);
        const body = getBody(request);
        const { amount } = body;

        const output = await this.service.buy(params.id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        sendResponse(response, 200, data);
    }

    public async sell(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const params = getParams(request);
        const body = getBody(request);
        const { amount } = body;

        const output = await this.service.sell(params.id, amount);

        const data = {
            id: output.id,
            balance: output.balance,
        };

        sendResponse(response, 200, data);
    }
}
