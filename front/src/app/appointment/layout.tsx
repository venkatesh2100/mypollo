
import Navbar from "@/components/Navbar";
import Service from "@/components/services";
import { ToastContainer } from "react-toastify";
//HACK: toster make cool animations
export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <Service />
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
