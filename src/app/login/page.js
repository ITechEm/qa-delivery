'use client'; 
import { signIn } from "next-auth/react";
import { useState } from "react";


const LoginPage = () => {
    const [error, setError] = useState(null);
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const result = await signIn('credentials', {
        redirect: false, // Prevent auto redirect on success
        email,
        password,
      });

    if (result.error) {
      setError("Email or password invalid"); // Set error message if login fails
    } else {
      // If successful, you can redirect or do whatever you need.
      window.location.href = '/'; // Redirect or manage post-login actions
    }
  }
    return (
        <section className="mt-8">
            <h1 className="text-center text-5xl mb-6 neucha">Login</h1>
            {error && <p className="text-center inria my-4" >{error}</p>} {/* Display error message */}
            <form className="max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
              <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              />
              <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              />
                 
                <p className=" mx-auto ml-2 mb-6"></p>
                <button  type="submit">Login</button>
          </form>
        </section>
    );
}
export default LoginPage;