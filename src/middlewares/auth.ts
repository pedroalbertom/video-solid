import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { FastifyReply, FastifyRequest } from "fastify"
import { sendResponse } from "../util/http.functions"

const secret = process.env.JWT_SECRET || "default_secret"

export async function authMiddleware(
    request: Request | FastifyRequest,
    response: Response | FastifyReply,
    next?: () => void
) {
    const authHeader = request.headers["authorization"]
    const token = authHeader?.split(" ")[1]

    if (!token) return sendResponse(response, 401, { error: "Token ausente" })

    try {
        const decoded = jwt.verify(token, secret);
        (request as any).user = decoded

        if (next) return next()
    } catch (err) {
        return sendResponse(response, 401, { error: "Token inválido" })
    }
}
