"use client";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import authApi from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/slice/authSlice";
import Swal from "sweetalert2";
export default function GoogleLoginButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    const request = {
      idToken,
      sdt: "0912345667",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      birthday: "1990-01-01",
    };
    try {
      const response = await authApi.loginWithGoogle(request);
      const userData = response.data;
      if (response.data) {
        if (response.data.status === "UNACTIVE") {
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
        sessionStorage.setItem("token", response.data.accessToken);
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Đăng nhập thất bại!");
    }
  };

  const handleError = () => {
    console.error("Google login failed");
    alert("Đăng nhập Google thất bại!");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
