import { Request, Response } from "express"
import { FastifyReply, FastifyRequest } from "fastify"

export interface IUserController {
    create(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
    list(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
    update(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
    delete(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>
}
