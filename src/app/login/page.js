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
        setError(result.error); // Set the error state with the error message
      } else {
        // Redirect or do whatever you need on successful login
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </div>
    );
  };
  
  export default LoginPage;