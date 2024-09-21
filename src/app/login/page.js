'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setErrorMessage(''); // Reset error message before a new login attempt

    try {
      const result = await signIn('credentials', { email, password, callbackUrl: '/' });
      if (!result?.ok) { // Check if sign in was not successful
        throw new Error('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message); // Show error to the user
    } finally {
      setLoginInProgress(false);
    }
  }


  return (
    <section className="mt-8">
        <h1 className="text-center text-5xl mb-6 neucha">Login</h1>
        <form className="max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                disabled={loginInProgress}
                onChange={ev => setEmail(ev.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                disabled={loginInProgress}
                onChange={ev => setPassword(ev.target.value)}
                required
                minLength={0}
                maxLength={15}
            />
            <p className="text-red-500">{errorMessage}</p> {/* Display error message */}
            <p className="mx-auto ml-2 mb-6"></p>
            <button disabled={loginInProgress} type="submit">
                {loginInProgress ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </section>
  );
}