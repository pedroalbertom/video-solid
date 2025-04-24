import { Request, Response } from "express";
import { FastifyRequest, FastifyReply } from "fastify";
import { IUserController } from "./user.controller";
import { IUserService } from "../../services/user/user.service";
import { userService } from "../../util/service.factory";
import { getBody, sendResponse, getParams } from "../../util/http.functions";

export class UserController implements IUserController {
    private constructor(readonly service: IUserService) { }

    public static build() {
        return new UserController(userService);
    }

    public async create(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const body = getBody(req);

        const { firstName, lastName, email, password } = body;

        const output = await this.service.create(firstName, lastName, email, password);

        const data = {
            id: output.id,
            firstName,
            lastName,
            email,
            password,
        };

        sendResponse(reply, 201, data);
    }

    public async list(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const output = await this.service.list();

        const data = {
            users: output.users,
        };

        sendResponse(reply, 200, data);
    }

    public async update(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const params = getParams(req);
        const body = getBody(req);

        const output = await this.service.update(params.id, body);

        const data = {
            id: output.id,
            firstName: output.firstName,
            lastName: output.lastName,
            email: output.email,
            password: output.password,
        };

        sendResponse(reply, 200, data);
    }

    public async delete(req: FastifyRequest | Request, reply: FastifyReply | Response) {
        const params = getParams(req);

        await this.service.delete(params.id);

        sendResponse(reply, 200, { msg: "Usuário deletado com sucesso!" });
    }
}
