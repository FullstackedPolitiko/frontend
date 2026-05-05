import { useAuth } from './authContext';

export default function UserMenu() {
    const { user, logout } = useAuth();
    if (!user) return null;

    return (
        <div className="user-menu">
            {user.pictureUrl && (
                <img src={user.pictureUrl} alt={user.name} className="user-avatar" />
            )}
            <span>{user.name}</span>
            <button onClick={logout}>Log out</button>
        </div>
    );
}