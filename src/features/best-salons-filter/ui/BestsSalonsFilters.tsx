"use client";
import type { PopularCategory } from "@/services/categoryService/categoryService";

export function BestsSalonsFilters({
  popularCategories,
  handleCategoryClick,
  activeCategory,
}: {
  popularCategories: PopularCategory[];
  handleCategoryClick: (id: number) => void;
  activeCategory: number;
}) {
  console.log("activeCategory", activeCategory);
  return (
    <div className="flex">
      {popularCategories.map((category) => (
        <div
          key={category.id}
          className={`flex font-semibold ${activeCategory === category.id ? "bg-primary rounded-full px-4 py-1 text-white font-semibold" : "px-4 py-1 cursor-pointer hover:text-text-secondary"}`}
          onClick={(id) => handleCategoryClick(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}
