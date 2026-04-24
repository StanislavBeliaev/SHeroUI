import { useState } from "react";
import type { SalonsLoaded } from "@/services/salonService/types";

export function useBestsSalonsFilter(salons: SalonsLoaded, getBestsSalonsFromServer: (id: number) => Promise<SalonsLoaded>) {
  const [currentCategory, setCurrentCategory] = useState<SalonsLoaded>(salons);
  const handleCategoryClick = async (id: number) => {
    let response = await getBestsSalonsFromServer(id);
    response = {
        ...response,
        activeCategory: id,
    }
    setCurrentCategory(response);
  };
  return { currentCategory, handleCategoryClick };
}