import { useAuth } from './authContext';

export default function UserMenu() {
    const { user, logout } = useAuth();
    if (!user) return null;

    const displayName = user.name ?? user.email ?? 'User';
    const initials =
        displayName
            .split(/[\s@]+/)        // split on spaces or '@' so emails work too
            .map((n) => n[0] ?? '')
            .filter(Boolean)
            .join('')
            .slice(0, 2)
            .toUpperCase() || '?';

    return (
        <div className="user-menu">
            <div className="user-info">
                <div className="user-avatar-initials">{initials}</div>
                <span className="user-name">{displayName}</span>
            </div>
            <button onClick={logout} className="user-logout">
                Log out
            </button>
        </div>
    );
}