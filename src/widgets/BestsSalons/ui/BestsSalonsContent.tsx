import {SalonCard} from "@/entities/salon-card/ui";
import {categoryService} from "@/services/categoryService/categoryService";
import {salonService} from "@/services/salonService/salonService";
import type {SalonsLoaded} from "@/services/salonService/types";

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
    console.log(popularCategories)
    return (
        <div className="flex flex-col gap-4">
            <div className="flex">
                {popularCategories.map((category) => (
                    <div key={category.id} className="flex gap-2">
                        {category.name}
                    </div>
                ))}
            </div>
            <div className="flex gap-3.5 overflow-x-auto p-1">
                <div className="flex gap-3">
                    {
                        salons?.content?.map((salon, idx) => (
                            <div key={salon.id} className="flex">
                                <SalonCard{...salon}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}