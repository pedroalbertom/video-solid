import { Request, Response } from "express";
import { IUserController } from "../user.controller";
import { IUserService } from "../../../services/user/user.service";
import { userService } from "../../../util/repository.factory";

export class UserControllerExpress implements IUserController {

    private constructor(private service: IUserService) { }

    public static build() {
        return new UserControllerExpress(userService);
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
