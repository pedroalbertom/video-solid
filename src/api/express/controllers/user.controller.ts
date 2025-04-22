import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserService } from "../../../services/user/implementation/user.service.implementation";
import { prisma } from "../../../util/prisma.util";

export class UserController {
    private service: UserService;

    private constructor(service: UserService) {
        this.service = service;
    }

    public static build() {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserService.build(aRepository);
        return new UserController(aService);
    }

    public async create(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        const output = await this.service.create(firstName, lastName, email, password);

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
        const output = await this.service.list();

        const data = {
            users: output.users
        };

        res.status(200).json(data);
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;

        const output = await this.service.update(id, req.body);

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
        const id = req.params.id;

        await this.service.delete(id);
        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    }
}
