import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserService } from "../../../services/user/implementation/user.service.implementation";
import { prisma } from "../../../util/prisma.util";

export class UserController {
    private constructor() { }

    public static build() {
        return new UserController()
    }

    public async create(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body

        const aRepository = UserRepositoryPrisma.build(prisma)
        const aService = UserService.build(aRepository)

        const output = await aService.create(firstName, lastName, email, password)

        const data = {
            id: output.id,
            firstName,
            lastName,
            email,
            password
        }

        res.status(201).json(data).send()
    }

    public async list(req: Request, res: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma)
        const aService = UserService.build(aRepository)

        const output = await aService.list()

        const data = {
            users: output.users
        }

        res.status(200).json(data).send()
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id

        const aRepository = UserRepositoryPrisma.build(prisma)
        const aService = UserService.build(aRepository)

        const output = await aService.update(id, req.body)

        const data = {
            id: output.id,
            firstName: output.firstName,
            lastName: output.lastName,
            email: output.email,
            password: output.password
        }

        res.status(200).json(data).send()
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id

        const aRepository = UserRepositoryPrisma.build(prisma)
        const aService = UserService.build(aRepository)

        await aService.delete(id)
        res.status(200).json({ msg: "Usuário deletado com sucesso!" }).send()
    }
}