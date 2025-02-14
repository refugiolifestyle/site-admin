"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-1 min-h-screen w-full">
        <div className="flex flex-1 justify-center items-center mx-auto w-full max-w-screen-xl p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </div>
    </>
  );
}
