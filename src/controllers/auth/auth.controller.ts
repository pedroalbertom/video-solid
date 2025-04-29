import { Request, Response } from "express"
import { FastifyReply, FastifyRequest } from "fastify"

export interface IAuthController {
    login(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
    logout(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
}
