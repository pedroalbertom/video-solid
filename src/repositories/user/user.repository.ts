import { User } from "../../entities/users/user";

export interface IUserRepository {
    save(user: User): Promise<void>,
    list(): Promise<User[]>,
    update(user: User): Promise<void | null>,
    find(id: string): Promise<User | null>
    delete(id: string): Promise<void | null>
}