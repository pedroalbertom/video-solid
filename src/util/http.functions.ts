export function getBody(request: any): any {
    return request.body
}

export function getParams(request: any): any {
    return request.params
}

export function sendResponse(response: any, statusCode: number, data: any): void {
    if (typeof response.code === "function" && typeof response.send === "function") {
        response.code(statusCode).send(data) // Fastify
    } else if (typeof response.status === "function" && typeof response.json === "function") {
        response.status(statusCode).json(data) // Express
    } else {
        throw new Error("Unknown response object")
    }
}