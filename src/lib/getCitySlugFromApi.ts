export type CityFromApi = {
    slug: string | null;
    id: string | null;
};

export async function getCitySlugFromApi(cityName: string, BASE_URL: string | undefined): Promise<CityFromApi | null> {
    try {
        if (!BASE_URL) {
            console.error("BASE_URL is not defined");
            return null;
        }

        const response = await fetch(`${BASE_URL}/city/chosen?citySlug=${cityName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        return {slug: data?.slug ?? null, id: data?.id ?? null};

    } catch (err) {
        console.error("Ошибка при получении города:", err);
        return null;
    }
}