import { UserProps } from "../../types/users/user.types"

export class User {
    private constructor(readonly props: UserProps) { }

    public static create(firstName: string, lastName: string, email: string, password: string) {
        return new User({
            id: crypto.randomUUID().toString(),
            firstName,
            lastName,
            email,
            password
        })
    }

    public static with(id: string, firstName: string, lastName: string, email: string, password: string) {
        return new User({
            id,
            firstName,
            lastName,
            email,
            password
        })
    }

    public get id() {
        return this.props.id
    }

    public get firstName() {
        return this.props.firstName
    }

    public get lastName() {
        return this.props.lastName
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }

    public set firstName(firstName: string) {
        this.props.firstName = firstName
    }

    public set lastName(lastName: string) {
        this.props.lastName = lastName
    }

    public set email(email: string) {
        this.props.email = email
    }

    public set password(password: string) {
        this.props.password = password
    }

}