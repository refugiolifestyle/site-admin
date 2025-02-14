"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebase";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html className="min-h-screen w-full" lang="en">
      <body className="min-h-screen w-full" suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen w-full">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
