'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', {email, password, callbackUrl: '/'});

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
               disabled={loginInProgress}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)}/>
        <button disabled={loginInProgress} type="submit">Login</button>
        
      </form>
    </section>
  );
}




///////////////////////////////////////////////////////////////////

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
  
//   if (response.ok) {
//       setLoginInProgress(true)
//     }
//     else {
//       setError(true);
//       }
//   return Response.json(setLoginInProgress);
// }

// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   return Response.json(
//     await setLoginInProgress()
//   );
// }