import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
//HACK: Clean Mobile Hamburger with Bg-Blut back drop
export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
      >
        <FiMenu size={24} aria-hidden="true" />
        <span className="sr-only">Open main menu</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden w-full">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute  max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Services</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <FiX size={24} aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Buy Medicine</a>
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Find Doctors</a>
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Lab Tests</a>
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Circle Membership</a>
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Health Records</a>
              <a href="#" className="block p-2 rounded hover:bg-gray-50">Credit Card</a>
            </div>

            <div onClick={() => router.push('/appointment')} className="p-4 border-t">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
