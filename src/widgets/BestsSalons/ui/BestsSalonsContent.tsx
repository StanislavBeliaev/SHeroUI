import {categoryService} from "@/services/categoryService/categoryService";
import {salonService} from "@/services/salonService/salonService";
import type {SalonsLoaded} from "@/services/salonService/types";
import {BestsSalonsCarousel} from "@/widgets/BestsSalons/ui/BestsSalonsCarousel";

export async function BestsSalonsContent() {
    const popularCategories = await categoryService.getPopularCategories();
    let salons: SalonsLoaded;
    if (popularCategories.length) {
        const firstCategoryId = popularCategories[0].id;
        salons = await salonService.getSalons({
            categoryId: [firstCategoryId],
        });
    } else {
        return null
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex">
                {popularCategories.map((category) => (
                    <div key={category.id} className="flex gap-2">
                        {category.name}
                    </div>
                ))}
            </div>
            <div className="w-full min-w-0">
                <BestsSalonsCarousel salons={salons.content}/>
            </div>
        </div>
    )
}