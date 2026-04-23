import {SectionBlock, SectionTitle} from "@/shared";
import {BestsSalonsContent} from "@/widgets/BestsSalons/ui/BestsSalonsContent";
import {Suspense} from "react";

export async function BestsSalons({ city }: { city: string }) {
    return (
        <SectionBlock>
            <SectionTitle title="Лучшие салоны красоты"/>
            <Suspense fallback="loading">
                <BestsSalonsContent city={city}/>
            </Suspense>
        </SectionBlock>
    )
}