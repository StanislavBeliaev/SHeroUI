import type {Props} from "@/services/globalTypes"
import {BestsSalons} from "@/widgets/BestsSalons/ui";

export default async function CityPage({params}: Props) {
    const {city} = await params;

    return (
        <BestsSalons/>
    )
}