import { User } from "../../entities/user";

export interface IUserRepository {
    save(user: User): Promise<void>,
    list(): Promise<User[]>,
    update(user: User): Promise<void>,
    find(id: string): Promise<User | null>
    delete(id: string): Promise<void>
}