
import { ToastContainer } from "react-toastify";
//HACK: toster make cool animations
export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
