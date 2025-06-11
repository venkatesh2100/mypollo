"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar"
import ContactPage from "@/components/rest";
import Service from "@/components/services"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <Service />
      <div className="flex flex-col lg:flex-row items-center justify-center sm:h-[90vh] p-4 lg:p-8 bg-gray-50">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 lg:py-35  lg:pl-30 w-full lg:w-1/2">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4 rounded-lg">
            Find a Doctor
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 max-w-lg rounded-lg">
            Connect with highly experienced and trusted medical professionals.
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              More Info
            </button>
            <button onClick={() => router.push('/appointment')} className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
              Checkout
            </button>
          </div>
        </div>


        <div className=" p-2 lg:p-4 w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src='/fdoctor.png'
            alt='Discount logo'
            width={580}
            height={420}
          />
        </div>
      </div>
      <div className=" bg-gray-100 h-[90vh]"></div>
      <ContactPage />
      <footer id="footer" />
    </div>
  );
}
