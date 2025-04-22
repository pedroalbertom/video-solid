import { UserDto, ListUserDto } from "../../dto/users.dto"

export interface IUserService {
    create(firstName: string, lastName: string, email: string, password: string,): Promise<UserDto>
    list(): Promise<ListUserDto>
    update(id: string, data: Partial<UserDto>): Promise<UserDto>
    delete(id: string): Promise<void>
}