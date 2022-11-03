
export type ErrorI = {
    response?: {
        data?: {
            error?: {
                message: string,
                statusCode: number,
                name: string,
            }
        }
    }
}
