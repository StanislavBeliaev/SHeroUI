import type { NextRequest } from "next/server";
import {citySlugHandler} from "@/lib/middleware/cityMiddlewareLogic"
import {composeMiddleware} from "@/lib/middleware/middlewareComposer/composerMiddleware";

export async function proxy(req: NextRequest) {
    return composeMiddleware(req,[
        citySlugHandler
    ])
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)",
    ],
};