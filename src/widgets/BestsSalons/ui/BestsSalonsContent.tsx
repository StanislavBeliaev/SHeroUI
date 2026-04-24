"use client";
import { BestsSalonsCarousel } from "@/widgets/BestsSalons/ui/BestsSalonsCarousel";
import { SalonCard } from "@/entities/salon-card/ui";
import { BestsSalonsFilters } from "@/features/best-salons-filter/ui";
import type { PopularCategory } from "@/services/categoryService/categoryService";
import type { SalonsLoaded } from "@/services/salonService/types";
import { useBestsSalonsFilter } from "@/features/best-salons-filter/ui/model/useBestsSalonsFilter";

export function BestsSalonsContent({
  city,
  popularCategories,
  salons,
  getBestsSalonsFromServer,
}: {
  city: string;
  popularCategories: PopularCategory[];
  salons: SalonsLoaded;
  getBestsSalonsFromServer: (id: number) => Promise<SalonsLoaded>;
}) {
  const { currentCategory, handleCategoryClick } = useBestsSalonsFilter(salons, getBestsSalonsFromServer);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <BestsSalonsFilters
          popularCategories={popularCategories}
          handleCategoryClick={handleCategoryClick}
          activeCategory={currentCategory.activeCategory}
        />
      </div>
      <BestsSalonsCarousel>
        {currentCategory.content.map((salon) => (
          <SalonCard key={salon.id} city={city} {...salon} />
        ))}
      </BestsSalonsCarousel>
    </div>
  );
}
