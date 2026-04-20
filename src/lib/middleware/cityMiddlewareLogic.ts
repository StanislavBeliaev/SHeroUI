import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCitySlugFromApi } from "./getCitySlugFromApi";

export async function handleCitySlug(req: NextRequest, baseUrl?: string) {
    const pathname = req.nextUrl.pathname;
    // Пример: /minsk/salon... -> ["", "minsk", "salon"...] -> minsk
    const pathParts = pathname.split("/");
    const cityNameFromUrl = pathParts[1];

    if (!cityNameFromUrl) {
        return NextResponse.next();
    }

    const cityCookie = req.cookies.get("City_slug");
    const currentCitySlug = cityCookie?.value;

    if (currentCitySlug === cityNameFromUrl) {
        return NextResponse.next();
    }

    const validCitySlug = await getCitySlugFromApi(cityNameFromUrl, baseUrl);

    if (!validCitySlug || validCitySlug !== cityNameFromUrl) {
        return NextResponse.redirect("/")
    }

    // Создаем ответ
    const response = NextResponse.next();

    // Устанавливаем новую куку
    response.cookies.set("City_slug", validCitySlug, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
        sameSite: "lax",
    });

    return response;
}