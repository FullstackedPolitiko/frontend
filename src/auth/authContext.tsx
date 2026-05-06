import { createContext, useContext, useState, type ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';
import type { User } from './User';
import { getStoredUser, storeAuth, clearAuth } from './authConsole';

interface AuthContextValue {
    user: User | null;
    isLoggedIn: boolean;
    login: (googleIdToken: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getStoredUser());

    const login = (googleIdToken: string, u: User) => {
        storeAuth(googleIdToken, u);
        setUser(u);
    };

    const logout = () => {
        googleLogout();
        clearAuth();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: user !== null, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}