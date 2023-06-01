export type HTTPMethods =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";

export type HTTPOptions = {
    headers: {
        Authorization: string | undefined,
        "Content-Type": string | undefined,
    },
    method: HTTPMethods,

};