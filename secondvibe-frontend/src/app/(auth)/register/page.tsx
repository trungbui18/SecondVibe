"use client";
import Link from "next/link";
import React, { useState } from "react";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import authApi from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/slice/authSlice";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    sdt: "",
    address: "",
    birthday: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      const res = await authApi.checkEmail(formData.email);
      console.log(res.data);
      if (!res.data) {
        Swal.fire({
          icon: "error",
          title: "Your email is existed",
          showConfirmButton: true,
        });
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.register(formData);
      const userData = response.data;
      if (userData) {
        const { id, email, fullName, avatar, role } = userData;
        dispatch(setUser({ id, email, fullName, avatar, role }));
        sessionStorage.setItem("token", response.data.accessToken);
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message || "Đăng ký thất bại",
          showConfirmButton: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message || "Đăng ký thất bại",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={step === 1 ? handleNextStep : handleSubmit}
    >
      <h2 className="text-2xl text-red-500 font-semibold">Đăng Ký</h2>
      <div className="text-gray-600 mb-4">
        {step === 1 ? (
          "Nhập email của bạn để bắt đầu"
        ) : (
          <>
            <div
              className=" hover:underline hover:text-red-500 cursor-pointer mb-2"
              onClick={() => {
                setStep(1);
              }}
            >
              &larr; Quay lại
            </div>
          </>
        )}
      </div>

      {step === 1 && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      )}

      {step === 2 && (
        <>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-1"
            >
              Họ và tên
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block text-sm font-medium mb-1"
            >
              Ngày sinh
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="sdt" className="block text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <input
              id="sdt"
              name="sdt"
              type="tel"
              value={formData.sdt}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Địa chỉ
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        {step === 1 ? "Tiếp tục" : "Đăng ký"}
      </button>

      <GoogleLoginButton />

      <div className="text-center text-sm text-gray-500 mt-8">
        Bạn đã có tài khoản?{" "}
        <Link href="/login" className="text-red-600 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </form>
  );
}
