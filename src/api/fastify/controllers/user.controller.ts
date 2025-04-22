import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserService } from "../../../services/user/implementation/user.service.implementation";
import { prisma } from "../../../util/prisma.util";

export class UserControllerFastify {

    private constructor(private service: UserService) { }

    public static build() {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);
        return new UserControllerFastify(aService);
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
