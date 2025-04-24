export function getBody(req: any): any {
    return req.body;
}

export function getParams(req: any): any {
    return req.params;
}

export function sendResponse(reply: any, statusCode: number, data: any): void {
    if (typeof reply.code === "function" && typeof reply.send === "function") {
        reply.code(statusCode).send(data); // Fastify
    } else if (typeof reply.status === "function" && typeof reply.json === "function") {
        reply.status(statusCode).json(data); // Express
    } else {
        throw new Error("Unknown reply object");
    }
}