import {categoryService} from "@/services/categoryService/categoryService";
import {salonService} from "@/services/salonService/salonService";

export async function BestsSalonsContent() {
    const popularCategories = await categoryService.getPopularCategories();
    if (popularCategories.length) {
        const firstCategoryId = popularCategories[0].id;
        const salons = await salonService.getSalons({
            categoryId: [firstCategoryId],
        });
    } else {
        return null
    }
    return (
        <div>
            Контент
        </div>
    )
}