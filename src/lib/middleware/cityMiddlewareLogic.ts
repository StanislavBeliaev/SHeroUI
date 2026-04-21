import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCitySlugFromApi } from "../getCitySlugFromApi";

export async function citySlugHandler(req: NextRequest): Promise<NextResponse | null> {
    const BASE_URL = process.env.BASE_URL;
    const pathname = req.nextUrl.pathname;
    const cityFromUrl = pathname.split("/")[1];
    if (!cityFromUrl) return null;

    const currentCity = req.cookies.get("City_slug")?.value;
    if (currentCity === cityFromUrl) return null;

    const valid = await getCitySlugFromApi(cityFromUrl, BASE_URL);
    if (!valid?.slug || valid.slug !== cityFromUrl) {
        return NextResponse.redirect("/");
    }

    const res = NextResponse.next();
    res.cookies.set("City_slug", valid.slug, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    if (valid.id) {
        res.cookies.set("City_id", valid.id, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }
    return res;
}