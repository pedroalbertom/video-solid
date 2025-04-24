import { Request, Response } from "express";
import { FastifyRequest, FastifyReply } from "fastify";
import { IUserController } from "./user.controller";
import { IUserService } from "../../services/user/user.service";
import { userServicePrisma, userServiceSequelize } from "../../util/service.factory";
import { getBody, sendResponse, getParams } from "../../util/http.functions";

export class UserController implements IUserController {
    private constructor(readonly service: IUserService) { }

    public static build() {
        return new UserController(userServiceSequelize);
    }

    public async create(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const body = getBody(request);

        const { firstName, lastName, email, password } = body;

        const output = await this.service.create(firstName, lastName, email, password);

        const data = {
            id: output.id,
            firstName,
            lastName,
            email,
            password,
        };

        sendResponse(response, 201, data);
    }

    public async list(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const output = await this.service.list();

        const data = {
            users: output.users,
        };

        sendResponse(response, 200, data);
    }

    public async update(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const params = getParams(request);
        const body = getBody(request);

        const output = await this.service.update(params.id, body);

        const data = {
            id: output.id,
            firstName: output.firstName,
            lastName: output.lastName,
            email: output.email,
            password: output.password,
        };

        sendResponse(response, 200, data);
    }

    public async delete(request: FastifyRequest | Request, response: FastifyReply | Response) {
        const params = getParams(request);

        await this.service.delete(params.id);

        sendResponse(response, 200, { msg: "Usuário deletado com sucesso!" });
    }
}
