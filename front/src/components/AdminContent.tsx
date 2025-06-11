"use client";
import { useEffect, useState } from 'react';
import { FaSpinner } from "react-icons/fa";
//HACK: This File includes All the Content I mean NOof Appointments etc
//HACK I love this Part get Lots of Info from DB
export default function AdminContent() {
  const [stats, setStats] = useState({
    paidUsers: 0,
    totalAppointments: 0,
    FailedAppointments: 0,
    CompletedAppointments: 0,
    NewAppointments: 0,
    departments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointmentGetAdmin/stats`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        setStats({
          CompletedAppointments: data.CompletedAppointments || 0,
          FailedAppointments: data.FailedAppointments || 0,
          NewAppointments: data.NewAppointments || 0,
          paidUsers: data.paidUsers || 0,
          totalAppointments: data.totalAppointments || 0,
          departments: data.departments?.length || 0
        });
      } catch (err) {
        console.log(err)
        setError('Failed to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[40vh] text-3xl text-gray-700 p-4">
        <div className="flex items-center gap-4">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          <div className="text-lg">I appreciate your patience.🫡</div>
        </div>
      </div>
    );
  if (error) return <div className="flex justify-center p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">💸 Appointments</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.paidUsers}</p>
        <p className="text-sm text-gray-500 mt-1">Users who completed payment</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2"> 🆕  Appointments</h3>
        <p className="text-3xl font-bold text-green-600">{stats.NewAppointments}</p>
        <p className="text-sm text-gray-500 mt-1">All scheduled appointments</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2"> ✅ Appointments</h3>
        <p className="text-3xl font-bold text-green-600">{stats.CompletedAppointments}</p>
        <p className="text-sm text-gray-500 mt-1">All scheduled appointments</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2"> ⛔ Appointments</h3>
        <p className="text-3xl font-bold text-green-600">{stats.FailedAppointments}</p>
        <p className="text-sm text-gray-500 mt-1">All scheduled appointments</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
        <p className="text-3xl font-bold text-green-600">{stats.totalAppointments}</p>
        <p className="text-sm text-gray-500 mt-1">All scheduled appointments</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Departments</h3>
        <p className="text-3xl font-bold text-purple-600">{stats.departments}</p>
        <p className="text-sm text-gray-500 mt-1">Active departments</p>
      </div>
    </div>
  );
}
