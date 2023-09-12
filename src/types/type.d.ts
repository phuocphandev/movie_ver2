declare type ApiResponse<T> = {
    statusCode: number
    message: String
    content:T
}