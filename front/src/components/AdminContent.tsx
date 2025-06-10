"use client";
import { useEffect, useState } from 'react';

export default function AdminContent() {
  const [stats, setStats] = useState({
    paidUsers: 0,
    totalAppointments: 0,
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
        setStats({
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

  if (loading) return <div className="flex justify-center p-4">Loading...</div>;
  if (error) return <div className="flex justify-center p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Paid Appointments</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.paidUsers}</p>
        <p className="text-sm text-gray-500 mt-1">Users who completed payment</p>
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
