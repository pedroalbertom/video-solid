export type UserInputDto = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type UserOutputDto = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
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