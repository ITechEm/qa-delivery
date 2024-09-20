'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    await signIn('credentials', {email, password, callbackUrl: '/'});
    setLoginInProgress(false);
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
                    
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
               
                />
                
                <p className=" mx-auto ml-2 mb-6"></p>
                <button disabled={loginInProgress} type="submit">Login</button>
            </form>
        </section>
    );
}