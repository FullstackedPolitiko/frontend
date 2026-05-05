export interface SagDTO {
    sagsnummer: number;
    overskrift: string;
    kortResume?: string | null;
    type: string;
    sidstOpdateret: string;
    politikere: string[];
    dokumentTitler: string[];
}

export interface SagFilterDTO {
    periodeId?: number;
    søgeord?: string | null;
    typeId?: number | null;
    specifikkeIds?: number[] | null;
}
