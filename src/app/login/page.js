'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";


const LoginPage = () => {
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const result = await signIn('credentials', {
        redirect: false, // Prevent auto redirect on success
        email,
        password,
      });

    if (result.error) {
      setError(result.error); // Set error message if login fails
    } else {
      // If successful, you can redirect or do whatever you need.
      window.location.href = '/'; // Redirect or manage post-login actions
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
                    
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
               
                />
                 {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <p className=" mx-auto ml-2 mb-6"></p>
                <button disabled={loginInProgress} type="submit">Login</button>
            </form>
        </section>
    );
}
export default LoginPage;