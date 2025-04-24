import { User } from "../../entities/users/user";
import { UserModel } from "../../models/user.model";
import { IUserRepository } from "./user.repository";

export class UserRepositorySequelize implements IUserRepository {
    private constructor() { }

    public static build() {
        return new UserRepositorySequelize();
    }

    public async save(user: User): Promise<void> {
        await UserModel.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
    }

    public async list(): Promise<User[]> {
        const models = await UserModel.findAll();

        return models.map(p => User.with(p.id, p.firstName, p.lastName, p.email, p.password));
    }

    public async update(user: User): Promise<void> {
        await UserModel.update({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }, {
            where: { id: user.id }
        });
    }

    public async find(id: string): Promise<User | null> {
        const model = await UserModel.findByPk(id);

        if (!model) return null;

        return User.with(model.id, model.firstName, model.lastName, model.email, model.password);
    }

    public async delete(id: string): Promise<void | null> {
        await UserModel.destroy({ where: { id } })
    }
}
