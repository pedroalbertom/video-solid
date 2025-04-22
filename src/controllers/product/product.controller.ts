import { Request, Response } from "express";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IProductController {
    create(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>;
    list(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>;
    buy(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>;
    sell(req: FastifyRequest | Request, reply: FastifyReply | Response): Promise<void>;
}
