import { Request, Response, NextFunction } from "express"
import { FastifyRequest, FastifyReply } from "fastify"

export interface Api {
    addPostRoute(
        path: string,
        handle: (req: FastifyRequest | Request, reply: FastifyReply | Response) => Promise<void>,
        middleware?: (req: any, res: any, next?: NextFunction) => Promise<void> | void
    ): Promise<void>

    addGetRoute(
        path: string,
        handle: (req: FastifyRequest | Request, reply: FastifyReply | Response) => Promise<void>,
        middleware?: (req: any, res: any, next?: NextFunction) => Promise<void> | void
    ): Promise<void>

    addPutRoute(
        path: string,
        handle: (req: FastifyRequest | Request, reply: FastifyReply | Response) => Promise<void>,
        middleware?: (req: any, res: any, next?: NextFunction) => Promise<void> | void
    ): Promise<void>

    addDeleteRoute(
        path: string,
        handle: (req: FastifyRequest | Request, reply: FastifyReply | Response) => Promise<void>,
        middleware?: (req: any, res: any, next?: NextFunction) => Promise<void> | void
    ): Promise<void>

    start(port: number): void
}
