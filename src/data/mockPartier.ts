import type { Party } from "../api/partyAPI.ts";
import type { Politician } from "../api/politicianApi";
import { mockPolitikere } from "./mockPolitikere";

interface PartyMeta {
    shortName: string;
    fullName: string;
    foundedYear: number;
    mandates: number;
    stubMembers?: Politician[];
}

const partyMeta: PartyMeta[] = [
    { shortName: "S", fullName: "Socialdemokratiet", foundedYear: 1871, mandates: 50 },
    { shortName: "V", fullName: "Venstre", foundedYear: 1870, mandates: 23 },
    { shortName: "M", fullName: "Moderaterne", foundedYear: 2022, mandates: 16 },
    { shortName: "SF", fullName: "Socialistisk Folkeparti", foundedYear: 1959, mandates: 15 },
    { shortName: "DD", fullName: "Danmarksdemokraterne", foundedYear: 2022, mandates: 14 },
    { shortName: "LA", fullName: "Liberal Alliance", foundedYear: 2007, mandates: 14 },
    { shortName: "KF", fullName: "Det Konservative Folkeparti", foundedYear: 1915, mandates: 10 },
    { shortName: "EL", fullName: "Enhedslisten", foundedYear: 1989, mandates: 9 },
    { shortName: "RV", fullName: "Radikale Venstre", foundedYear: 1905, mandates: 7 },
    { shortName: "DF", fullName: "Dansk Folkeparti", foundedYear: 1995, mandates: 5 },
    { shortName: "ALT", fullName: "Alternativet", foundedYear: 2013, mandates: 6 },
    {
        shortName: "NB",
        fullName: "Nye Borgerlige",
        foundedYear: 2015,
        mandates: 0,
        stubMembers: [
            { id: 9001, fornavn: "Lars", efternavn: "Boje Mathiesen", navn: "Lars Boje Mathiesen", gruppenavnkort: "NB", biografi: "Tidligere folketingsmedlem og fhv. politisk ordfører for Nye Borgerlige." },
            { id: 9002, fornavn: "Mette", efternavn: "Thiesen", navn: "Mette Thiesen", gruppenavnkort: "NB", biografi: "Tidligere folketingsmedlem for Nye Borgerlige." },
        ],
    },
    {
        shortName: "KD",
        fullName: "Kristendemokraterne",
        foundedYear: 1970,
        mandates: 0,
        stubMembers: [
            { id: 9101, fornavn: "Marianne", efternavn: "Karlsmose", navn: "Marianne Karlsmose", gruppenavnkort: "KD", biografi: "Politisk leder af Kristendemokraterne." },
        ],
    },
];

export const mockPartier: Party[] = partyMeta.map((meta) => {
    const realMembers = mockPolitikere.filter((p) => p.gruppenavnkort === meta.shortName);
    const members = realMembers.length > 0 ? realMembers : meta.stubMembers ?? [];
    return {
        shortName: meta.shortName,
        fullName: meta.fullName,
        foundedYear: meta.foundedYear,
        mandates: meta.mandates,
        members,
    };
});