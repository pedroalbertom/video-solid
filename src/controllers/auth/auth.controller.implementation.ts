// src/controllers/auth/AuthController.ts
import { Request, Response } from 'express'
import { IAuthService } from '../../services/auth/auth.service'
import { authServiceSequelize } from '../../util/service.factory'
import { getBody, sendResponse } from '../../util/http.functions'
import { FastifyRequest, FastifyReply } from 'fastify'

export class AuthController {

    private constructor(private service: IAuthService) { }

    public static build() {
        return new AuthController(authServiceSequelize)
    }

    public async login(request: FastifyRequest | Request, response: FastifyReply | Response): Promise<void> {
        const body = getBody(request)
        const { email, password } = body

        const result = await this.service.login({ email, password })

        sendResponse(response, 200, result)
    }

    public async logout(request: FastifyRequest | Request, response: FastifyReply | Response): Promise<void> {
        const token = request.headers.authorization?.split(' ')[1]

        if (!token) throw new Error('Token inválido')

        await this.service.logout(token)

        sendResponse(response, 204, { msg: 'Logout realizado com sucesso!' })
    }
}