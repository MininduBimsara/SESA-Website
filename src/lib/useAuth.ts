"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminInfo {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        router.replace("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setAdminInfo(data.admin);
        } else {
          // Token is invalid
          localStorage.removeItem("authToken");
          localStorage.removeItem("adminInfo");
          router.replace("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminInfo");
    router.replace("/admin/login");
  };

  return { isAuthenticated, isLoading, adminInfo, logout };
}
