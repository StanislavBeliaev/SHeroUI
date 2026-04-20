import {api} from "@/lib/api";
import type {ICityServiceGetCitiesParams, ICityServiceGetCitiesResponse} from "./types"

export const cityService = {
    getCities: async (params: ICityServiceGetCitiesParams) => {
        const response = await api.get<ICityServiceGetCitiesResponse[]>('/country/withCities', {
            params
        })
        return response.data;
    }
}