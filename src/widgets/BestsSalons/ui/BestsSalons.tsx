import { SectionBlock, SectionTitle } from "@/shared";
import { categoryService } from "@/services/categoryService/categoryService";
import { salonService } from "@/services/salonService/salonService";
import type { SalonsLoaded } from "@/services/salonService/types";
import { BestsSalonsContent } from "@/widgets/BestsSalons/ui/BestsSalonsContent";
import { BestsSalonsFilterServer } from "../lib/BestsSalonsFilterServer";

export async function BestsSalons({ city }: { city: string }) {
  const popularCategories = await categoryService.getPopularCategories();
  let salons: SalonsLoaded;
  if (popularCategories.length) {
    const firstCategoryId = popularCategories[0].id;
    salons = await salonService.getSalons({
      categoryId: [firstCategoryId],
    });
    salons = {
      ...salons,
      activeCategory: firstCategoryId,
    };
  } else {
    return null;
  }

  return (
    <SectionBlock>
      <SectionTitle title="Лучшие салоны красоты" />
      <BestsSalonsContent
        city={city}
        popularCategories={popularCategories}
        salons={salons}
        getBestsSalonsFromServer={BestsSalonsFilterServer}
      />
    </SectionBlock>
  );
}
