import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export type MiddlewareHandler = (
    req: NextRequest,
    previousResponse?: NextResponse
) => Promise<NextResponse | null> | NextResponse | null;

export async function composeMiddleware(
    req: NextRequest,
    handlers: MiddlewareHandler[]
): Promise<NextResponse> {
    let response: NextResponse | null = null;

    for (const handler of handlers) {
        const result = await handler(req, response ?? undefined);
        if (result) {
            response =
                result;
            if (result.status >= 300 && result.status < 400) {
                return result;
            }
        }
    }

    return response ?? NextResponse.next();
}