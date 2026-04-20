import {ReactNode} from "react";

export function SectionBlock ({children}: {children: ReactNode}) {
    return (
        <section className="container mx-auto">
            {children}
        </section>
    )
}