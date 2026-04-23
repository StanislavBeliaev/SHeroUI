import {ReactNode} from "react";

export function SectionBlock ({children}: {children: ReactNode}) {
    return (
        <section className="container mx-auto flex flex-col gap-2 lg:px-0 px-3">
            {children}
        </section>
    )
}