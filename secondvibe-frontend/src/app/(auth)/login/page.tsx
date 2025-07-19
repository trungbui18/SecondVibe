"use client";

import React, { useState } from "react";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import Link from "next/link";
import authApi from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/slice/authSlice";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await authApi.login(loginData);
      const userData = response.data;
      if (userData) {
        if (userData.status === "UNACTIVE") {
          Swal.fire({
            icon: "error",
            title: "Your account is banned",
            showConfirmButton: true,
          });
          router.push("/");
          return;
        }
        const { id, email, fullName, avatar, role } = userData;
        dispatch(setUser({ id, email, fullName, avatar, role }));
        sessionStorage.setItem("token", userData.accessToken);
        if (userData.role === "ADMINISTRATOR") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: response.message || "Login failed",
          showConfirmButton: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message || "Đăng nhập thất bại",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <h2 className="text-2xl text-red-500 font-semibold">Đăng Nhập</h2>
      <p className="text-gray-600 mb-4">
        Vui lòng đăng nhập để tiến hành trải nghiệm mua sắm !
      </p>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Đăng nhập
      </button>

      <GoogleLoginButton />

      <div className="text-center text-sm text-gray-500 mt-8">
        Bạn là người mới?{" "}
        <Link href={"/register"} className="text-red-600 hover:underline">
          Đăng ký
        </Link>
      </div>
    </form>
  );
}
