import { UserInputDto, UserOutputDto, ListUserDto } from "../../dtos/users/users.dto"

export interface IUserService {
    create(firstName: string, lastName: string, email: string, password: string): Promise<UserOutputDto>
    list(): Promise<ListUserDto>
    update(id: string, data: Partial<UserInputDto>): Promise<UserOutputDto>
    delete(id: string): Promise<void>
}
