'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from 'axios'; // Import Axios

export default function LoginPage() { 
    const [credentials, setCredentials] = useState({ email: '', password: '' }); 
    const [loginInProgress, setLoginInProgress] = useState(false); 
    const [error, setError] = useState('');

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});
        setLoginInProgress(false);
        setError('');

        if (!credentials.email || !credentials.password) {
            setError('Email and Password are required!');
            setLoginInProgress(false);
            return;
        }

        try {
            // Make an API call using Axios
            const response = await axios.post('https://spark-qa-delivery.vercel.app/api/login', credentials);
            
            // Here you can handle the successful response
            if (response.data.success) {
                // Perform actions on successful login, like redirecting or storing tokens
            } else {
                setError(response.data.message); // Adjust based on your API's response structure
            }
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoginInProgress(false);
            if (!error) {
                setCredentials({ email: '', password: '' });
            }
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-5xl mb-6 neucha">Login</h1>
            <form className="block max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    disabled={loginInProgress}
                    onChange={handleInputChange}
                    required 
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    disabled={loginInProgress}
                    onChange={handleInputChange}
                    required 
                />
                {error && <p className="error">{error}</p>}
                <button disabled={loginInProgress} type="submit">
                    {loginInProgress ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
}