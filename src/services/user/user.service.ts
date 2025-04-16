export type UserDto = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type ListUserDto = {
    users: {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    }[]
}

export interface IUserService {
    create(firstName: string, lastName: string, email: string, password: string,): Promise<UserDto>
    list(): Promise<ListUserDto>
    update(id: string, data: Object): Promise<UserDto>
    delete(id: string): Promise<void>
}