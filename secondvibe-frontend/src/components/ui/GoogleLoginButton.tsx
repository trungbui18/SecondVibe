"use client";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    console.log("ID Token:", idToken);
    try {
      const response = await axios.post("http://localhost:8080/auth/google", {
        idToken: idToken,
        sdt: "0912345667",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        birthday: "1990-01-01",
      });

      console.log("Login success", response.data);
      alert("Login thành công!");
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
