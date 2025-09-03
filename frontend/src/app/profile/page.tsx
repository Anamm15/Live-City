"use client";
import UserProfileCard from "./components/UserProfileCard";
import Navbar from "@/components/semantic/Navbar";
import { User, Gender, Religion, MaritalStatus, Education } from "@/types/user";
import { useGetMeQuery } from "./hooks/mutation";

// Data Dummy untuk ditampilkan
const mockUser: User = {
  id: 1,
  nationalIdentityNumber: "3512345678900001",
  name: "Aisyah Putri",
  email: "aisyah.putri@example.com",
  points: 1250,
  gender: Gender.FEMALE,
  birthday: "1995-08-17",
  birthplace: "Surabaya",
  religion: Religion.ISLAM,
  maritalStatus: MaritalStatus.SINGLE,
  education: Education.BACHELOR,
  job: "UI/UX Designer",
  phoneNumber: "081234567890",
  profilePictureUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
};

export default function ProfilePage() {
  const { data } = useGetMeQuery();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 mt-20 md:mt-0">
        {data && <UserProfileCard user={data.data} />}
      </main>
    </>
  );
}
