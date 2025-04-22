import { FastifyRequest, FastifyReply } from "fastify";
import { IUserController } from "./user.controller";
import { IUserService } from "../../services/user/user.service";
import { userService } from "../../util/repository.util";

export class UserControllerFastify implements IUserController {

    private constructor(readonly service: IUserService) { }

    public static build() {
        return new UserControllerFastify(userService);
    }

    public async create(req: FastifyRequest, reply: FastifyReply) {

        const { firstName, lastName, email, password } = req.body as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        };

        const output = await this.service.create(firstName, lastName, email, password);

        const data = {
            id: output.id,
            firstName,
            lastName,
            email,
            password
        };

        reply.code(201).send(data);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {

        const output = await this.service.list();

        const data = {
            users: output.users
        };

        reply.code(200).send(data);
    }

    public async update(req: FastifyRequest, reply: FastifyReply) {

        const { id } = req.params as { id: string };
        const body = req.body as {
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
        };

        const output = await this.service.update(id, body);

        const data = {
            id: output.id,
            firstName: output.firstName,
            lastName: output.lastName,
            email: output.email,
            password: output.password
        };

        reply.code(200).send(data);
    }

    public async delete(req: FastifyRequest, reply: FastifyReply) {

        const { id } = req.params as { id: string };

        await this.service.delete(id);

        reply.code(200).send({ msg: "Usuário deletado com sucesso!" });
    }
}
