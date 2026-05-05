import type {LoginResponse} from "./LoginResponse.ts";
import type {User} from "./User.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error(`Login failed: ${res.status}`);
    return res.json();
}

export function getStoredToken(): string | null {
    return localStorage.getItem('jwt');
}

export function getStoredUser(): User | null {
    const u = localStorage.getItem('user');
    return u ? (JSON.parse(u) as User) : null;
}

export function storeAuth(token: string, user: User): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth(): void {
    localStorage.removeItem('jwt');
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