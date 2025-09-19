"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import ServiceCard from "@/components/cards/ServicesCard";
import { useSubmissionQuery } from "./hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import { Submission } from "@/types/submission";
import EmptyState from "../components/EmptyState";
import { containerVariants } from "@/components/supports/FramerMotionVariants";

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [submissions, setSubmissions] = useState<
    (Submission & { type: string })[]
  >([]);
  const { data, isLoading } = useSubmissionQuery();

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = sub.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "" || sub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (data) {
      setSubmissions(data.map((sub) => ({ ...sub, type: "Submission" })));
    }
  }, [data]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl 2xl:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            User Submissions
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Manage and review incoming submissions from users.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-auto p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="w-full flex items-center justify-center h-96">
            <SpinnerLoading size="8" label="Loading submissions" />
          </div>
        ) : (
          <>
            {filteredSubmissions && filteredSubmissions.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredSubmissions?.map((item) => (
                  <ServiceCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  );
}
