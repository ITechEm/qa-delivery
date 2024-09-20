'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState('');
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid) {
      setFormData(prev => ({
         ...prev,
         error: "The email is not valid.",
         sizeText: 8,
         creatingUser: false
       }));
       return;
     }

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        setError(''); // Clear error on input change
    };

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        setLoginInProgress(true);
        setError('');

        if (!credentials.email || !credentials.password) {
            setError('Email and Password are required!');
            setLoginInProgress(false);
            return;
        }

        try {
            const result = await signIn('credentials', { ...credentials, callbackUrl: '/' });
            if (result.error) {
                setError(result.error);
            }
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoginInProgress(false);
            if (!error) {
                setCredentials({ email: '', password: '' }); // Reset credentials
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
                    required // Add required attribute for better UX
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    disabled={loginInProgress}
                    onChange={handleInputChange}
                    required // Add required attribute for better UX
                />
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <button disabled={loginInProgress} type="submit">
                    {loginInProgress ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
}

// async function handleFormSubmit(ev) {
//   ev.preventDefault();
//   setLoginInProgress(true);
//   setError(false);
//   await signIn('credentials', {email, password});
//   const response = await fetch('/api/auth/signIn', {
//     method: 'POST',
//     body: JSON.stringify({email, password, callbackUrl: '/'}),
//     headers: {'Content-Type': 'application/json'},
//   });
//   if (response.ok) {
//     setLoginInProgress(true)
//   }
//   else {
//     setError(true);
//   }
//   setLoginInProgress(false);
// }