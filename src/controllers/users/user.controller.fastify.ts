import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../util/prisma.util";
import { UserRepositoryPrisma } from "../../repositories/user/user.repository.prisma";
import { UserService } from "../../services/user/user.service.implementation";
import { IUserController } from "./user.controller";

export class UserControllerFastify implements IUserController {

    private constructor() { }

    public static build() {
        return new UserControllerFastify();
    }

    public async create(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const { firstName, lastName, email, password } = req.body as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        };

        const output = await aService.create(firstName, lastName, email, password);

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
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const output = await aService.list();

        const data = {
            users: output.users
        };

        reply.code(200).send(data);
    }

    public async update(req: FastifyRequest, reply: FastifyReply) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const { id } = req.params as { id: string };
        const body = req.body as {
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
        };

        const output = await aService.update(id, body);

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
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const { id } = req.params as { id: string };

        await aService.delete(id);

        reply.code(200).send({ msg: "Usuário deletado com sucesso!" });
    }
}
