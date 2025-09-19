"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPencilAlt,
  FaFileDownload,
  FaCalendarAlt,
  FaTag,
  FaInfoCircle,
  FaHashtag,
  FaSave,
} from "react-icons/fa";
import { getStatusBadge } from "@/components/supports/componentStyles";
import {
  useDetailSubmissionQuery,
  useSubmissionStatusUpdateMutation,
} from "../hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import SelectOption from "@/components/form/SelectOption";
import Button from "@/components/buttons/Button";

const options = [
  { value: "PENDING", label: "PENDING" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "REJECTED", label: "REJECTED" },
  { value: "PROCESSING", label: "PROCESSING" },
];

// Item Metadata di kolom kanan
const MetadataItem = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-6 mt-1 text-slate-400">{icon}</div>
    <div className="ml-3">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="text-md text-slate-800 dark:text-slate-200 mt-1">
        {children}
      </div>
    </div>
  </div>
);

// --- Komponen Halaman Detail Utama ---
export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { data: submission, isLoading } = useDetailSubmissionQuery(Number(id));
  const file = submission?.files?.[0];
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(submission?.status);
  const { mutate } = useSubmissionStatusUpdateMutation();

  const handleUpdateData = () => {
    setIsUpdating(!isUpdating);
  };

  const handleSaveData = () => {
    if (status && submission) {
      mutate(
        { id: Number(id), status },
        {
          onSuccess: () => {
            setIsUpdating(!isUpdating);
            submission.status = status;
          },
        }
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Halaman */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard/submissions"
            className="inline-flex items-center font-semibold text-secondary hover:underline mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Kembali ke Daftar Kiriman
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {submission?.title}
          </h1>
        </div>

        {/* Layout Utama (Grid) */}
        {isLoading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <SpinnerLoading size="8" label="Loading Submission" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {submission && (
              <>
                {/* Kolom Kiri: Konten */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      Deskripsi Singkat
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {submission?.description}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      Konten Lengkap
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {submission.content}
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Metadata dan Aksi */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                      Detail & Aksi
                    </h2>
                    <div className="space-y-5">
                      <MetadataItem icon={<FaInfoCircle />} label="Status">
                        {isUpdating ? (
                          <SelectOption
                            label=""
                            value={status}
                            options={options}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                        ) : (
                          <span
                            className={`${getStatusBadge(
                              submission.status
                            )} text-xs rounded-full px-2 py-1 font-semibold`}
                          >
                            {submission.status}
                          </span>
                        )}
                      </MetadataItem>
                      <MetadataItem icon={<FaTag />} label="Kategori">
                        {submission.category}
                      </MetadataItem>
                      <MetadataItem
                        icon={<FaCalendarAlt />}
                        label="Tanggal Kirim"
                      >
                        {new Date(submission.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </MetadataItem>
                      <MetadataItem icon={<FaHashtag />} label="Submission ID">
                        {submission.shortId}
                      </MetadataItem>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                      <Button
                        onClick={handleUpdateData}
                        className="w-full flex items-center justify-center px-4 py-3"
                      >
                        <FaPencilAlt className="mr-2" />
                        {isUpdating ? "Batal" : "Update Data"}
                      </Button>
                      {isUpdating && (
                        <Button
                          onClick={handleSaveData}
                          className="w-full flex items-center justify-center px-4 py-3"
                        >
                          <FaSave className="mr-2" />
                          Save Change
                        </Button>
                      )}
                      <a
                        href={file?.urlFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={"data"}
                        className={`w-full flex items-center justify-center px-4 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                          file?.urlFile
                            ? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                            : "bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                        }`}
                        // Menonaktifkan tombol jika tidak ada file
                        {...(!file?.urlFile && {
                          onClick: (e) => e.preventDefault(),
                          "aria-disabled": true,
                        })}
                      >
                        <FaFileDownload className="mr-2" />
                        {file?.urlFile ? `Unduh Data` : "Tidak Ada File"}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
