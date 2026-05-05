import apiClient from './apiClient';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    googleID?: string;
}

export const loginUser = async (): Promise<User> => {
    const response = await apiClient.get('/api/users/login');
    return response.data;
};
