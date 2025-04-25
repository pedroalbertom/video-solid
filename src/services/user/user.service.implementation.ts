import { UserDto, ListUserDto } from "../../dtos/users/users.dto";
import { User } from "../../entities/users/user";
import { IUserRepository } from "../../repositories/user/user.repository";
import { hashPassword } from "../../util/password.hash";
import { IUserService } from "./user.service";

export class UserService implements IUserService {

    private constructor(readonly userRepository: IUserRepository) { }

    public static build(userRepository: IUserRepository) {
        return new UserService(userRepository)
    }

    public async create(firstName: string, lastName: string, email: string, password: string): Promise<UserDto> {
        const hashedPassword = await hashPassword(password);
        const aUser = User.create(firstName, lastName, email, hashedPassword)

        await this.userRepository.save(aUser)

        const output: UserDto = {
            id: aUser.id,
            firstName: aUser.firstName,
            lastName: aUser.lastName,
            email: aUser.email,
            password: aUser.password
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

    public async update(id: string, data: Partial<UserDto>): Promise<UserDto> {
        const user = await this.userRepository.find(id)
        if (!user) throw new Error("Usuário não encontrado")


        if (data.firstName) user.firstName = data.firstName
        if (data.lastName) user.lastName = data.lastName
        if (data.email) user.email = data.email
        if (data.password) {
            const hashedPassword = await hashPassword(data.password);
            user.password = hashedPassword
        }

        await this.userRepository.update(user)

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }
    }


    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }

}