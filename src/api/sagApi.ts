import apiClient from './apiClient';
import type { SagDTO, SagFilterDTO } from '../model/SagDTO';

export const getSagById = async (id: number): Promise<SagDTO> => {
    const response = await apiClient.get<SagDTO>(`/api/sager/${id}`);
    return response.data;
};

export const getFilteredSager = async (filter?: SagFilterDTO): Promise<SagDTO[]> => {
    const response = await apiClient.get<SagDTO[]>('/api/sager/filter', { params: filter });
    return response.data;
};

export const getSagerByParty = async (partyShortName: string, periode: string): Promise<SagDTO[]> => {
    const response = await apiClient.get<SagDTO[]>(`/api/sager/parti/${partyShortName}/${periode}`);
    return response.data;
};

export const getAllSagerByPartyEver = async (partyShortName: string, periode: string): Promise<SagDTO[]> => {
    const response = await apiClient.get<SagDTO[]>(`/api/sager/parti/${partyShortName}/alle/${periode}`);
    return response.data;
};
