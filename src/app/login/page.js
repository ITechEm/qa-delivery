'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState('');

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        setError('');

        try {
            const result = await signIn('credentials', { email, password, callbackUrl: '/' });
            if (result.error) {
                setError(result.error);
            }
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoginInProgress(false);
            if (!error) {
                setEmail('');
                setPassword('');
            }
        }
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-5xl mb-6 neucha">Login</h1>
            <form className="block max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
                
                <input type="email" id="email" placeholder="Email" value={email}
                       disabled={loginInProgress}
                       onChange={ev => {
                           setEmail(ev.target.value);
                           setError('The email address you entered is not connected to an account'); 
                       }} />
                       
                
                <input type="password" id="password" placeholder="Password" value={password}
                       disabled={loginInProgress}
                       onChange={ev => {
                           setPassword(ev.target.value);
                           setError('The password you entered is incorrect');
                       }} />
                       
                {error && <p className="">{error}</p>} {/* Display error message */}
                <p className=" mx-auto ml-2 mb-6"></p>
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