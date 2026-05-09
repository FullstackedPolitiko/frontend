import type { Politician } from "./politicianApi";

export interface Party {
    shortName: string;
    fullName: string;
    foundedYear: number;
    mandates: number;
    members: Politician[];
}

//mangler endpoint.