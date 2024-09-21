'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true); // Set to true when login starts
    try {
        await signIn('credentials', { email, password, callbackUrl: '/' });
    } catch (error) {
        console.error("Error:", err);
        useState(prev => ({ ...prev, error: "Email or password inccorrect!"}));
        // Optionally, show an error to the user here (e.g., using state)
    } finally {
        useState(prev => ({ ...prev, setLoginInProgress: false }));
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
            <p className="mx-auto ml-2 mb-6"></p>
            <button disabled={loginInProgress} type="submit">
                {loginInProgress ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </section>
  );
}