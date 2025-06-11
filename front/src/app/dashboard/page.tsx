"use client"
import AdminAppointments from "@/components/AdminAppointments";
import AdminContent from "@/components/AdminContent";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export default function AdminDashboard() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  //HACK: Checkig whether the Admin is logged in or not 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        router.push("/login")
      }

      else {
        setAuth(true)
      }
    }).catch(() => router.push('/login'));
  }, [router])

  // if (!auth) {
  //   return (
  //     <div>Login Back.....</div>
  //   )
  // }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center text-3xl sm:text-6xl">AdminDashboard</div>
      <AdminContent />
      <AdminAppointments />
    </div>
  )
}
