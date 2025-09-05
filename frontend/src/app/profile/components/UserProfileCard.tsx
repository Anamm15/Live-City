"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  GenderOptions,
  ReligionOptions,
  MaritalStatusOptions,
  EducationOptions,
  User,
} from "@/types/user";
import ProfileField from "@/app/profile/components/ProfileField";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiBriefcase,
  FiEdit,
  FiSave,
  FiX,
  FiUpload,
  FiCreditCard,
} from "react-icons/fi";
import { FaVenusMars, FaBook, FaMosque, FaHeart } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { formatToUSDate } from "@/utils/dateFormatter";
import SpinnerLoading from "@/components/loading/SpinnerLoading";

type UserProfileCardProps = {
  user: User;
};

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (isEditing) {
      // Batal edit, kembalikan data ke semula
      setFormData(user);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulasi panggilan API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Saving data:", formData);
    // Di sini Anda akan memanggil API untuk menyimpan data formData
    // contoh: await updateUserProfile(formData);

    setIsLoading(false);
    setIsEditing(false);
    toast.success("Profil berhasil diperbarui!");
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: User) => ({
          ...prev,
          profilePictureUrl: reader.result as string,
        }));
        if (!isEditing) setIsEditing(true);
        toast.success("Foto profil siap diunggah. Klik Simpan Perubahan.");
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <>
        <SpinnerLoading size="10" className="text-5xl" />
      </>
    );
  }

  return (
    <div className="w-full md:w-max rounded-2xl bg-white border border-gray-200 p-8 shadow-2xl backdrop-blur-xl md:px-20">
      <div className="w-full md:flex flex-row-reverse justify-center gap-28">
        {/* Kolom Foto & Info Utama */}
        <div className="flex flex-col items-center space-y-4 md:col-span-1 my-auto">
          <div className="group relative">
            <Image
              src={
                formData.profilePictureUrl ||
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
              }
              alt={formData.name || "Profile Picture"}
              width={144}
              height={144}
              className="h-36 w-36 rounded-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-105 cursor-pointer"
            >
              <FiUpload className="h-8 w-8 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.name}
            </h1>
          </div>
          <div className="flex w-full flex-col space-y-4 items-center">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center justify-center w-52"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <FiSave className="mr-2 w-5 h-5" />
                  )}
                  <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
                </Button>
                <Button
                  onClick={handleEditToggle}
                  className="flex items-center justify-center w-52"
                >
                  <FiX className="mr-2 w-5 h-5" />
                  <span>Batal</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEditToggle}
                className="flex items-center justify-center w-52"
              >
                <FiEdit className="mr-2 w-5 h-5" />
                <span>Edit Profil</span>
              </Button>
            )}
          </div>
        </div>

        {/* Kolom Detail Data Diri */}
        <div className="">
          <h2 className="mt-8 md:mt-0 mb-4 border-b pb-2 text-xl font-bold text-gray-800">
            Detail Informasi
          </h2>
          <div className="grid grid-cols-1 gap-x-20 sm:grid-cols-2">
            <ProfileField
              label="Nama Lengkap"
              name="name"
              value={formData.name}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={<FiUser />}
            />
            <ProfileField
              label="Nomor Induk Kependudukan"
              name="nationalIdentityNumber"
              value={formData.nationalIdentityNumber}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={<FiCreditCard />}
            />
            <ProfileField
              label="Alamat Email"
              name="email"
              value={formData.email}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="email"
              icon={<FiMail />}
            />
            <ProfileField
              label="Nomor Telepon"
              name="phoneNumber"
              value={formData.phoneNumber}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={<FiPhone />}
            />
            <ProfileField
              label="Tanggal Lahir"
              name="birthday"
              value={formatToUSDate(formData.birthday)}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="date"
              icon={<FiCalendar />}
            />
            <ProfileField
              label="Tempat Lahir"
              name="birthplace"
              value={formData.birthplace}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={<FiMapPin />}
            />
            <ProfileField
              label="Jenis Kelamin"
              name="gender"
              value={formData.gender}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="select"
              options={GenderOptions}
              icon={<FaVenusMars />}
            />
            <ProfileField
              label="Agama"
              name="religion"
              value={formData.religion}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="select"
              options={ReligionOptions}
              icon={<FaMosque />}
            />
            <ProfileField
              label="Status Pernikahan"
              name="maritalStatus"
              value={formData.maritalStatus}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="select"
              options={MaritalStatusOptions}
              icon={<FaHeart />}
            />
            <ProfileField
              label="Pendidikan Terakhir"
              name="education"
              value={formData.education}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="select"
              options={EducationOptions}
              icon={<FaBook />}
            />
            <ProfileField
              label="Pekerjaan"
              name="job"
              value={formData.job}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={<FiBriefcase />}
            />
            <ProfileField
              label="Poin"
              name="points"
              type="number"
              value={formData.points}
              isEditing={false}
              icon={<FiAward />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
