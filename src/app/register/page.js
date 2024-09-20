"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    let response;

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Response: ", res);
        response = res;
      })
      .catch((err) => {
        console.error("Error: ", err);
        response = err;
      });

    if (response._id) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h2 className="text-center  text-5xl mb-6">
        Register
      </h2>
      {userCreated && (
        <div className="my-4 text-center">
          User created.<br />
          Now you can{' '}
          <Link className="underline" href={'/login'}>Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.<br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" value={email}
               disabled={creatingUser}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="Password" value={password}
               disabled={creatingUser}
                onChange={ev => setPassword(ev.target.value)}/>
                <p className="text-left text-graylight text-xs mx-auto ml-2 mb-4">Password must be at least 6 characters</p>
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        
        {/* <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button> */}
        <div className="text-center my-4 text-gray-500 pt-4">
          <p>Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
          </p>
        </div>
      </form>
    </section>
  );
}