import type { User } from './User.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL; 

export async function fetchOrCreateUser(googleIdToken: string): Promise<User> {
    const res = await fetch(`${API_URL}/api/users/login`, {
        headers: {
            Authorization: `Bearer ${googleIdToken}`,
        },
    });
    if (!res.ok) throw new Error(`Login failed: ${res.status}`);
    return res.json();
}

export function getStoredToken(): string | null {
    return localStorage.getItem('googleIdToken');
}

export function getStoredUser(): User | null {
    const u = localStorage.getItem('user');
    return u ? (JSON.parse(u) as User) : null;
}

export function storeAuth(googleIdToken: string, user: User): void {
    localStorage.setItem('googleIdToken', googleIdToken);
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth(): void {
    localStorage.removeItem('googleIdToken');
    localStorage.removeItem('user');
}

export async function authedFetch(path: string, options: RequestInit = {}): Promise<Response> {
    const token = getStoredToken();
    return fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}

export async function maybeAuthedFetch(path: string, options: RequestInit = {}): Promise<Response> {
    return authedFetch(path, options);
}