import { User } from "../../../entities/user";
import { PrismaClient } from "../../../generated/prisma";
import { IUserRepository } from "../user.repository";

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
        const aUser = await this.prisma.user.findMany()

        const users: User[] = aUser.map(p => {
            const { id, firstName, lastName, email, password } = p
            return User.with(id, firstName, lastName, email, password)
        })

        return users
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

    public async find(id: string): Promise<User | null> {
        const aUser = await this.prisma.user.findUnique({ where: { id } })

        if (!aUser) return null

        const { firstName, lastName, email, password } = aUser

        const user = User.with(id, firstName, lastName, email, password)

        return user
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        })
    }

}