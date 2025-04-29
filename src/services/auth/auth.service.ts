import { LoginInputDto, LoginOutputDto } from "../../dtos/auth/auth.dto";

export interface IAuthService {
    login(data: LoginInputDto): Promise<LoginOutputDto>
    logout(token: string): Promise<void>
}