'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', {email, password, callbackUrl: '/'});
// Check for empty fields first
if (!credentials.email || !credentials.password) {
  setError('Email and Password are required!');
  return;
}
    setLoginInProgress(false);
  }

    return (
        <section className="mt-8">
            <h1 className="text-center text-5xl mb-6 neucha">Login</h1>
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
                <button disabled={loginInProgress} type="submit">
                    {loginInProgress ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
}