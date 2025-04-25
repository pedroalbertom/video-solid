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
        const users = await UserModel.findAll();

        return users.map(p => User.with(p.id, p.firstName, p.lastName, p.email, p.password));
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

    public async findById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);

        if (!user) return null;

        return User.with(user.id, user.firstName, user.lastName, user.email, user.password);
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) return null;

        return User.with(user.id, user.firstName, user.lastName, user.email, user.password);
    }

    public async delete(id: string): Promise<void | null> {
        await UserModel.destroy({ where: { id } })
    }
}
