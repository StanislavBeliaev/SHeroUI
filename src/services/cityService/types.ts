export type ICityServiceGetCitiesParams = {
    active: boolean;
    sizeType: "STANDARD"
}
export interface ICityServiceGetCitiesResponse {
    slug: string | undefined;
    id: string;
    name: string;
    flagUrl: string;
    cities: ICity[];
}

export interface ICity {
    id: number;
    name: string;
    slug: string;
    latitude: number;
    longitude: number;
    cases: ICityCases;
}

export interface ICityCases {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
    ins: string;
    pre: string;
    m_nom: string | null;
    m_gen: string | null;
    m_dat: string | null;
    m_acc: string | null;
    m_ins: string | null;
    m_pre: string | null;
}