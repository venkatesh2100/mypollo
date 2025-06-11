"use client"
import AdminAppointments from "@/components/AdminAppointments";
import AdminContent from "@/components/AdminContent";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation"
import { useEffect } from "react";


export default function AdminDashboard() {
  const router = useRouter();
  //HACK: Checkig whether the Admin is logged in or not 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        router.push("/login")
      }
    }).catch(() => router.push('/login'));
  }, [router])


  return (
    <div>
      <Navbar />
      <div className="flex justify-center text-3xl sm:text-6xl">AdminDashboard</div>
      <AdminContent />
      <AdminAppointments />
    </div>
  )
}
