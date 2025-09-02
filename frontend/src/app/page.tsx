"use client";
import Navbar from "@/components/semantic/Navbar";
import Hero from "./components/hero";
import Profile from "./components/profile";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden h-[2000px]">
        <Hero />
        <Profile />
      </div>
    </>
  );
}
