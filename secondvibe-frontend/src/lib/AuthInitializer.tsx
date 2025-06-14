"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slice/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, []);

  return <>{children}</>;
}
