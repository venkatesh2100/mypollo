"use client";
import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phonenumber: string;
  deparment: string;
  date: string;
  time: string;
  message?: string;
  stats: string;
  createdAt: string;
  notes?: string;
  review?: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  //HACK: Try to Fetch the Appos from the DB
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentGetAdmin`, {
          credentials: "include",
        });
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : data.appointments || []);
      } catch (err) {
        console.error(err);
        setAuthError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (authError) return <p className="text-center text-red-500 mt-10">{authError}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Appointments Dashboard</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((app) => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [status, setStatus] = useState(appointment.stats);
  const [notes, setNotes] = useState(appointment.notes || "");
  const [review, setReview] = useState(appointment.review || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  //HACK: Geting Update the Appointment :LLOLL: easy
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentGetAdmin/${appointment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ stats: status, notes, review }),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert("Update failed: " + data.error);
      }
    } catch (e) {
      console.log(e)
      alert("Error updating appointment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border shadow-lg rounded-xl p-5 space-y-2 transition hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{appointment.name}</h2>
        <span className="text-sm text-gray-500">{new Date(appointment.createdAt).toLocaleString()}</span>
      </div>
      <p><span className="font-medium">Email:</span> {appointment.email}</p>
      <p><span className="font-medium">Phone:</span> {appointment.phonenumber}</p>
      <p><span className="font-medium">Department:</span> {appointment.deparment}</p>
      <p><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
      <p><span className="font-medium">Time:</span> {appointment.time}</p>
      {appointment.message && <p><span className="font-medium">Message:</span> {appointment.message}</p>}

      <div className="mt-3 space-y-2">
        <label className="block font-medium text-sm text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="NEW">NEW</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <label className="block font-medium text-sm text-gray-700 mt-2">Admin Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Enter notes here..."
        />

        <label className="block font-medium text-sm text-gray-700 mt-2">Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Write your review..."
        />

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          {saving ? "Saving..." : "Update Appointment"}
        </button>

        {saved && <p className="text-green-600 text-sm mt-1">Saved successfully ✅</p>}
      </div>
    </div>
  );
}
