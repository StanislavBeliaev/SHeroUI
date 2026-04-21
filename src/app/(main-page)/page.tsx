import {cityService} from "@/services/cityService/cityService"
import {CardBase} from "@/shared/CardBase";

export default async function Home() {
    const cities = await cityService.getCities({
        active: true,
        sizeType: "STANDARD"
    })
    return (
        <div className="flex justify-center items-start">
            {cities.map((country) => (
                <div key={country.id} className="flex justify-center items-center mt-auto">
                    <CardBase title={country.name} description={country.cities} slug={country.slug} footer="Footer"/>
                </div>
            ))}
        </div>
    );
}
