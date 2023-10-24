declare type ApiResponse<T> = {
    status: number
    message: string
    content:T
}