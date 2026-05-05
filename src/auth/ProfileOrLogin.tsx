import { useAuth } from './authContext';
import LoginButton from './LoginButton';
import UserMenu from './ProfileMenu';

export default function AuthSection() {
    const { user } = useAuth();
    return user ? <UserMenu /> : <LoginButton />;
}