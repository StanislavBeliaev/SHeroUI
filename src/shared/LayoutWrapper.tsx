import type {ReactNode} from "react";
import {Open_Sans} from "next/font/google";
import "@/app/globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    fallback: ["system-ui", "sans-serif"],
});

export default function LayoutWrapper({children}: { children: ReactNode }) {
    return (
        <html lang="en" className={`${openSans.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col font-sans">
        {children}
        </body>
        </html>
    )
}