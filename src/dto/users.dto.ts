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