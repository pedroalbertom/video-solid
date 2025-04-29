import { ListUserDto, UserInputDto, UserOutputDto } from "../../dtos/users/users.dto"
import { User } from "../../entities/users/user"
import { IUserRepository } from "../../repositories/user/user.repository"
import { hashPassword } from "../../util/password.hash"
import { IUserService } from "./user.service"

export class UserService implements IUserService {

    private constructor(readonly userRepository: IUserRepository) { }

    public static build(userRepository: IUserRepository) {
        return new UserService(userRepository)
    }

    public async create(firstName: string, lastName: string, email: string, password: string): Promise<UserOutputDto> {
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) throw new Error("Email já está em uso.")

        if (!firstName || !lastName || !email || !password) throw new Error("Campo faltando")

        const hashedPassword = await hashPassword(password)

        const user = User.create(firstName, lastName, email, hashedPassword)

        await this.userRepository.save(user)

        const output: UserOutputDto = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }

        return output
    }

    public async list(): Promise<ListUserDto> {
        const aUsers = await this.userRepository.list()

        const users = aUsers.map(u => {
            return {
                id: u.id,
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                password: u.password
            }
        })

        const output: ListUserDto = {
            users
        }

        return output
    }

    public async update(id: string, data: Partial<UserInputDto>): Promise<UserOutputDto> {
        const user = await this.userRepository.findById(id)
        if (!user) throw new Error("Usuário não encontrado.")


        if (data.firstName) user.firstName = data.firstName
        if (data.lastName) user.lastName = data.lastName
        if (data.email) {
            const existingUser = await this.userRepository.findByEmail(data.email)
            if (existingUser) throw new Error("Email já está em uso.")
            user.email = data.email
        }
        if (data.password) {
            const hashedPassword = await hashPassword(data.password)
            user.password = hashedPassword
        }

        await this.userRepository.update(user)

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }


    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }

}