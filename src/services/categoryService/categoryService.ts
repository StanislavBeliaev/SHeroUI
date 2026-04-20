import {api} from "@/lib/api";

export type PopularCategory = {
    id: number;
    name: string;
}

export const categoryService = {
    getPopularCategories: async () => {
        const response = await api.get<PopularCategory[]>("/category/main/popular", {
            revalidate: 84600,
            tags: ['category-popular'],
        });
        return response.data;
    }
}