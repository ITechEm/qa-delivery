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
        
        // Check for empty fields first
        if (!credentials.email || !credentials.password) {
            setError('Email and Password are required!');
            return;
        }

        setLoginInProgress(true);

        try {
            // Attempt to sign in
            const signInResponse = await signIn('credentials', {
                email: credentials.email, 
                password: credentials.password, 
                redirect: false
            });

            if (signInResponse.error) {
                setError('Invalid email or password.'); // Adjust based on desired error message
            } else {
                // Make an API call using Axios
                const response = await axios.post('https://spark-qa-delivery.vercel.app/api/login', credentials);
                
                if (response.data.success) {
                    // Clear credentials on successful login
                    setCredentials({ email: '', password: '' });
                    // Redirect or perform other actions
                } else {
                    setError(response.data.message);
                }
            }
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoginInProgress(false);
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-5xl mb-6 neucha"></h1>
            {error && <p className="error text-center mb-4">{error}</p>}
            <form className="max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
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
                
                <p className=" mx-auto ml-2 mb-6"></p>
                <button disabled={loginInProgress} type="submit"> Login
                    {loginInProgress ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
}