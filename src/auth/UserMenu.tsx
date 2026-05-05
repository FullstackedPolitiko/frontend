import { useAuth } from './authContext';

export default function UserMenu() {
    const { user, logout } = useAuth();
    if (!user) return null;

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="user-menu">
            <div className="user-info">
                <div className="user-avatar-initials">{initials}</div>
                <span className="user-name">{user.name}</span>
            </div>
            <button onClick={logout} className="user-logout">
                Log out
            </button>
        </div>
    );
}