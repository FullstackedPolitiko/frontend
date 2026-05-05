import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { loginWithGoogle } from './authConsole';
import { useAuth } from './authContext';

export default function LoginButton() {
    const { login } = useAuth();

    const handleSuccess = async (cred: CredentialResponse) => {
        if (!cred.credential) return;
        try {
            const { token, user } = await loginWithGoogle(cred.credential);
            login(token, user);
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error('Google login failed')}
        />
    );
}