import apiClient from './apiClient';

export interface Politician {
    id?: number;
    name?: string;
    partyShortName?: string;
}

export const getPoliticians = async (partyShortName: string, period: string): Promise<Politician[]> => {
    const response = await apiClient.get(`/api/PoliticianData/politicians/${partyShortName}/${period}`);
    return response.data;
};
