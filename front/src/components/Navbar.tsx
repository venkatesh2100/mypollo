"use client"
import Image from 'next/image';
import React from 'react';
import { FaUser, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Hamburger from './hambargur';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [cartItems] = React.useState(3); // Example cart item count
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  //HACK: Mypollo set 1 2 3 

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentGetAdmin/stats`, {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, { credentials: 'include' });
        console.log(res)
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log(e)
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
    setIsAuthenticated(false);
  };
  return (
    <nav className="bg-white shadow-bottom-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          <div className="flex items-center">
            <Hamburger />
            <div className="flex-shrink-0 flex items-center">
              <Image src="/pharmacy_logo.svg" alt="Pharmacy Logo" onClick={() => router.push('/')} width={80} height={40} />

              <div className="hidden md:flex gap-2 cursor-pointer group mx-4">
                <div className="text-green-500 transition-colors">
                  <LocationIcon />
                </div>
                <div className="text-sm">
                  <p className="text-gray-700">Deliver Address</p>
                  <p className="font-medium text-green-400 text-md transition-colors">Select Address</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:inline-flex transition-colors duration-200 ease-in-out">
              <Image
                src='/discount.png'
                alt='Discount logo'
                width={30}
                height={18}
              />
            </button>

            <button className="p-2 pt-3 rounded-full transition-colors relative">
              <FaShoppingCart size={20} aria-hidden="true" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>

            <div>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors"
                >
                  <FaSignOutAlt size={20} aria-hidden="true" />
                  <span className="sr-only">Logout</span>
                </button>
              ) : (

                <button onClick={() => router.push('/dashboard')} className="hidden sm:flex items-center gap-1 text-green-400 hover:bg-green-200 border border-green-900 px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="text-sm text-black">Admin Login</span>
                  <FaUser size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}
