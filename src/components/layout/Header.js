'use client';
import {CartContext} from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useContext, useState} from "react";

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link  href={'/profile'} className="whitespace-nowrap">
          <h1 data-testid="gotoprofile" className="text-black inknut trimmedbutton">Hi, {userName}</h1>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-primary rounded text-white px-8 py-2 inknut">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'} className="text-black inknut">Login</Link>
        <Link href={'/register'} className="bg-primary rounded text-white px-8 py-2 inknut">
          Register
        </Link>
      </>
    );
  }
  return null; // Handle the default case
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary text-2xl pallete-mosaic" href={'/'}>
          QA Delivery
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center inknut">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks className="text-center item-center" status={status} userName={userName} maxLength={10}/>
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-4 inknut ">
          <Link className="text-primary text-2xl pallete-mosaic" href={'/'}>
            QA Delivery
          </Link>
          <Link className= "ml-6" href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4">
          <AuthLinks status={status} userName={userName}  maxLength={10}/>
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}