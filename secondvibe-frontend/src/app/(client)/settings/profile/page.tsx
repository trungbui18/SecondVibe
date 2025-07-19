"use client";
import React, { useState, useEffect } from "react";
import { useClientDetail } from "@/hooks/useProfile";
import profileApi from "@/services/profile";
import Swal from "sweetalert2";

export default function ProfileSettingsPage() {
  const { data, error, isLoading } = useClientDetail();
  const [form, setForm] = useState({
    fullName: "",
    sdt: "",
    email: "",
    birthday: "",
    address: "",
    avatar: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    branch: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        fullName: data.fullName || "",
        sdt: data.sdt || "",
        email: data.email || "",
        birthday: data.birthday || "",
        address: data.address || "",
        avatar: data.avatar || "",
        bankName: data.bankName || "",
        accountNumber: data.accountNumber || "",
        accountHolderName: data.accountHolderName || "",
        branch: data.branch || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const res = profileApi.updateClient(form);
    Swal.fire({
      toast: true,
      icon: "success",
      position: "top-end",
      title: "Update successfully!",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile.</div>;
  if (!data) return <div>No profile data found.</div>;

  return (
    <form
      className="max-w-4xl mx-auto   p-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      {/* Personal Info */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={form.avatar || "/default-avatar.png"}
            alt={form.fullName}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="flex-1">
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="sdt"
              value={form.sdt}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
      {/* Bank Info */}
      <div className="mt-10 p-6 bg-white rounded-lg border border-gray-200 shadow">
        <h3 className="font-semibold mb-4 text-lg text-gray-800">
          Bank Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Bank</label>
            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Account Holder</label>
            <input
              type="text"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Branch</label>
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-colors"
      >
        Save
      </button>
    </form>
  );
}
