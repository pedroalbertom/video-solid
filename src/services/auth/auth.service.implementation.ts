import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { LoginInputDto, LoginOutputDto } from "../../dtos/auth/auth.dto"
import { IUserRepository } from "../../repositories/user/user.repository"
import { IAuthService } from "./auth.service"

export class AuthService implements IAuthService {

    private constructor(
        private userRepository: IUserRepository,
        private jwtSecret: string = process.env.JWT_SECRET || 'default_secret'
    ) { }

    public static build(userRepository: IUserRepository) {
        return new AuthService(userRepository)
    }

    public async login(data: LoginInputDto): Promise<LoginOutputDto> {
        const user = await this.userRepository.findByEmail(data.email)

        if (!user) throw new Error("Usuário não encontrado!")

        const passwordMatch = await bcrypt.compare(data.password, user.password)
        if (!passwordMatch) throw new Error("Credenciais inválidas")

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            this.jwtSecret,
            { expiresIn: '1d' }
        )

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.firstName + " " + user.lastName
            }
        }
    }
    public async logout(token: string): Promise<void> {
        throw new Error("Method not implemented.")
    }

}