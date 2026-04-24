import { salonService } from "@/services/salonService/salonService";
export const BestsSalonsFilterServer = async (id: number) => {
  "use server";
  const salons = await salonService.getSalons({
    categoryId: [id],
    activeCategory: id,
  });
  return salons;
}