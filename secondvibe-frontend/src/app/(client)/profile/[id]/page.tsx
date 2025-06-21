"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import profileApi from "@/services/profile";
import { ClientProfileResponse } from "@/types/profile";
export default function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<ClientProfileResponse | null>(null);

  useEffect(() => {
    const idNumber = Number(params.id);
    const fetchUser = async () => {
      try {
        const res = await profileApi.getProfile(idNumber);
        setUser(res.data); // Lưu dữ liệu vào state
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      }
    };
    fetchUser();
  }, [params.id]);

  if (!user) return <div>Đang tải...</div>; // Loading state

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="h-40 bg-cover bg-center">
        <img
          src="https://mweb-cdn.karousell.com/build/profile-bg-0cfd0a9fd0.jpg"
          className="w-full h-full"
          alt="Background"
        />
      </div>

      <ProfileHeader user={user} />
      <ProfileTabs id={user.id} />
    </div>
  );
}
