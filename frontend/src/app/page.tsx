"use client"
import Hero from "./components/hero";
import Profile from "./components/profile";

export default function Home() {
  return (
    <div className="overflow-x-hidden h-[2000px]">
      <Hero />
      <Profile />
    </div>
  );
}
