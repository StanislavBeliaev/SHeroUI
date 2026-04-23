import {BestsSalons} from "@/widgets/BestsSalons/ui";

export default async function CityPage({params}: {params: {city: string}}) {
    const {city} = await params;

    return (
        <BestsSalons city={city} />
    )
}