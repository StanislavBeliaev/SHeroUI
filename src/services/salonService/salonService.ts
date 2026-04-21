import {api} from "@/lib/api";
import type {GetSalonsParams, SalonsLoaded} from "@/services/salonService/types";

export const salonService = {
    getSalons: async (params: GetSalonsParams) => {
        const response = await api.get<SalonsLoaded>(`/salon`,{
            params,
            revalidate: 84600,
            tags: ['get-salons-by-category'],
        });
        return response.data;
    }
}