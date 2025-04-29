// src/controllers/auth/AuthController.ts
import { Request, Response } from 'express';
import { IAuthService } from '../../services/auth/auth.service';
import { authService } from '../../util/service.factory';
import { getBody } from '../../util/http.functions';

export class AuthController {

    private constructor(private authService: IAuthService) { }

    public static build() {
        return new AuthController(authService)
    }

    public async login(request: Request, response: Response): Promise<Response> {
        const body = getBody(request);
        const { email, password } = body;

        const result = await this.authService.login({ email, password });

        return response.json(result);
    }

    public async logout(request: Request, response: Response): Promise<Response> {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new Error('Token inválido')

        await this.authService.logout(token)

        return response.status(204).send();
    }
}