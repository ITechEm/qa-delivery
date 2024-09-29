"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    creatingUser: false,
    userCreated: false,
    error: null,
  });

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setFormData(prev => ({ ...prev, creatingUser: true, error: null, userCreated: false }));


    const { email, password } = formData;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 6 && password.length <= 12;
  
    if (!isPasswordValid) {
      setFormData(prev => ({ ...prev, error: "Password must be between 6 and 12 characters.", creatingUser: false }));
      return;
    }

    if (!isEmailValid) {
      setFormData(prev => ({ ...prev, error: "The email is not valid.", creatingUser: false }));
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data._id) {
        setFormData(prev => ({ ...prev, userCreated: true }));
      } else {
        setFormData(prev => ({ ...prev, error: "User creation failed. Please try again." }));
      }
    } catch (err) {
      console.error("Error:", err);
      setFormData(prev => ({ ...prev, error: err.message || "An unexpected error occurred." }));
    } finally {
      setFormData(prev => ({ ...prev, creatingUser: false }));
    }
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="mt-8">
      <h2 className="text-center text-5xl mb-6 neucha">Register</h2>
      {formData.userCreated && (
        <div className="my-4 text-center">
          User created. Now you can{' '}
          <Link className="underline" href={'/login'}>Login &raquo;</Link>
        </div>
      )}

      {formData.error && (
        <div className="my-4 text-center inria">
          {formData.error}
        </div>
      )}

      <form className="block max-w-xs mx-auto inika" onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled={formData.creatingUser}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            disabled={formData.creatingUser}
            onChange={handleChange}
            required
            minLength={0}
            maxLength={15}
          />
        <p className=" mx-auto ml-2 mb-6"></p>
        <button type="submit" disabled={formData.creatingUser}>
          {formData.creatingUser ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center pt-4 inria">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}