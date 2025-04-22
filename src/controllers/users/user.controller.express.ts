import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../repositories/user/user.repository.prisma";
import { UserService } from "../../services/user/user.service.implementation";
import { prisma } from "../../util/prisma.util";

export class UserControllerExpress {

    private constructor() { }

    public static build() {
        return new UserControllerExpress();
    }

    public async create(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const { firstName, lastName, email, password } = req.body;

        const output = await aService.create(firstName, lastName, email, password);

        const data = {
            id: output.id,
            firstName,
            lastName,
            email,
            password
        };

        res.status(201).json(data);
    }

    public async list(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const output = await aService.list();

        const data = {
            users: output.users
        };

        res.status(200).json(data);
    }

    public async update(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const id = req.params.id;

        const output = await aService.update(id, req.body);

        const data = {
            id: output.id,
            firstName: output.firstName,
            lastName: output.lastName,
            email: output.email,
            password: output.password
        };

        res.status(200).json(data);
    }

    public async delete(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);

        const id = req.params.id;

        await aService.delete(id);

        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    }
}
