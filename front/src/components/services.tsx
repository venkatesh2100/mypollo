"use client"
import { useRouter } from "next/navigation"


export default function Service() {
  const router = useRouter();
  return (

    <div className="hidden sm:inline bg-white shadow-sm ">
      <div className="container  mx-auto px-4 py-2">

        <div className="hidden sm:flex items-center justify-between overflow-x-auto scrollbar-hide px-4 space-x-6 lg:space-x-12">
          <ServiceItem title="Buy Medicine" />
          <ServiceItem title="Find Doctors" />
          <ServiceItem title="Lab Tests" />
          <ServiceItem title="Circle Membership" />
          <ServiceItem title="Health Records" />
          <ServiceItem title="Credit Card" />

          <div className="ml-4 shrink-0 relative group">
            <button onClick={() => router.push('/appointment')} className="flex items-center px-3 py-1.5 text-sm bg-green-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow hover:shadow-md whitespace-nowrap group-active:pr-8">
              Book Appointment
              <span className=" right-4 opacity-0 group-hover:opacity-100 group-active:right-4 group-active:opacity-100 transition-all duration-900">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceItem({ title }) {
  return (
    <div className="relative min-w-fit cursor-pointer group py-1 shrink-0">
      <span className="text-md font-bold text-gray-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
        {title}
      </span>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
    </div>
  )
}
