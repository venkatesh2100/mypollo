"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PayNow from "@/components/paynow";
export default function AppointmentForm() {
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    date: new Date(),
    time: "",
    message: ""
  });
  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //HACK: Implement Normal Payment Method instead of Razorpay.    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...form, date: form.date.toISOString() })
        }
      );

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        // toast.success("Appointment booked successfully!");
        setShowPayment(true);
        setBookingId(data.id);

        setForm({
          name: "",
          email: "",
          phone: "",
          department: "",
          date: new Date(),
          time: "",
          message: ""
        });
      } else {
        toast.error(data.error || "Failed to book appointment.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl mt-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select Department</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Sexologist">Sexologist</option>
          <option value="Physician">Physician</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="ENT">ENT</option>
          <option value="Psychiatrist">Psychiatrist</option>
        </select>

        <div className="w-full border rounded p-2">
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <DatePicker
            selected={form.date}
            onChange={(date: Date) => setForm((prev) => ({ ...prev, date }))}
            className="w-full p-2 border rounded"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </div>

        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select Time Slot</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:30">10:30 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:30">03:30 PM</option>
          <option value="17:00">05:00 PM</option>
        </select>

        <textarea
          name="message"
          placeholder="Any specific concern?"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
        >
          Book Appointment
        </button>
      </form>
      {showPayment && (
        <PayNow
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
