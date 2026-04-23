import { categoryService } from "@/services/categoryService/categoryService";
import { salonService } from "@/services/salonService/salonService";
import type { SalonsLoaded } from "@/services/salonService/types";
import { BestsSalonsCarousel } from "@/widgets/BestsSalons/ui/BestsSalonsCarousel";
import { SalonCard } from "@/entities/salon-card/ui";

export async function BestsSalonsContent({ city }: { city: string }) {
  const popularCategories = await categoryService.getPopularCategories();
  let salons: SalonsLoaded;
  if (popularCategories.length) {
    const firstCategoryId = popularCategories[0].id;
    salons = await salonService.getSalons({
      categoryId: [firstCategoryId],
    });
  } else {
    return null;
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
        <BestsSalonsCarousel>
          {salons.content.map((salon) => (
            <SalonCard key={salon.id} city={city} {...salon} />
          ))}
        </BestsSalonsCarousel>
    </div>
  );
}
