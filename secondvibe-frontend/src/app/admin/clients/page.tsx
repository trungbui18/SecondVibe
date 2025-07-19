"use client";
import React, { useEffect, useState } from "react";
import profileApi from "@/services/profile";
import { AllClientResponse } from "@/types/profile";
import axios from "axios";
import { axiosInstancePrivate } from "@/lib/axiosInstance";

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "UNACTIVE", label: "Banned" },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<AllClientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await profileApi.getAllClient();
        setClients(res.data);
      } catch (e) {
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await axiosInstancePrivate.put(
        `/client/admin/update-status?id=${id}&status=${status}`
      );
      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (e) {
      alert("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="px-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Avatar</th>
              <th className="py-2 px-4 border-b border-gray-200">Full Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Created At</th>
              <th className="py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-200">
                  <img
                    src={client.avatar || "/default-avatar.png"}
                    alt={client.fullName}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {client.fullName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {client.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <select
                    value={client.status}
                    onChange={(e) =>
                      handleStatusChange(client.id, e.target.value)
                    }
                    disabled={updatingId === client.id}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {client.create_at}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {updatingId === client.id ? (
                    <span className="text-blue-500">Updating...</span>
                  ) : (
                    <span className="text-green-600">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
