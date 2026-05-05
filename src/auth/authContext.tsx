import { createContext, useContext, useState, type ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';
import type {User} from "./User.ts";
import {clearAuth, getStoredUser, storeAuth} from "./authConsole.ts";


interface AuthContextValue {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getStoredUser());

    const login = (token: string, u: User) => {
        storeAuth(token, u);
        setUser(u);
    };

    const logout = () => {
        googleLogout();
        clearAuth();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}