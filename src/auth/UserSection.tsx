import { useAuth } from './authContext';
import LoginButton from './LoginButton';
import UserMenu from './UserMenu.tsx';

export default function UserSection() {
    const { user } = useAuth();
    return user ? <UserMenu /> : <LoginButton />;
}