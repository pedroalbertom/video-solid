import { User } from "../../entities/users/user";
import { PrismaClient } from "../../../generated/prisma";
import { IUserRepository } from "./user.repository";

export class UserRepositoryPrisma implements IUserRepository {

    private constructor(readonly prisma: PrismaClient) { }

    public static build(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma)
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        await this.prisma.user.create({ data })
    }

    public async list(): Promise<User[]> {
        const users = await this.prisma.user.findMany()

        const userList: User[] = users.map(p => {
            const { id, firstName, lastName, email, password } = p
            return User.with(id, firstName, lastName, email, password)
        })

        return userList
    }

    public async update(user: User): Promise<void> {
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data
        })
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } })

        if (!user) return null


        return User.with(user.id, user.firstName, user.lastName, user.email, user.password)
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({ where: { email } })

        if (!user) return null

        return User.with(user.id, user.firstName, user.lastName, email, user.password)
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        })
    }

}