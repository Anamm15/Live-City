"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import ServiceCard from "@/components/cards/ServicesCard";
import { useReportQuery } from "./hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import { Report } from "@/types/report";
import EmptyState from "../components/EmptyState";
import { containerVariants } from "@/components/supports/FramerMotionVariants";

export default function ReportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [reports, setReports] = useState<(Report & { type: string })[]>([]);
  const { data, isLoading } = useReportQuery();

  const filteredReports = reports.filter((rep) => {
    const matchesSearch = rep.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "" || rep.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setReports(data.map((rep) => ({ ...rep, type: "Report" })));
    }
  }, [data]);

  return (
    <div className="p-4 sm:p-6 md:p-8 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl 2xl:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            User Reports
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Manage and review all incoming messages from users.
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
            <option value="">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {isLoading ? (
          <div className="w-full flex items-center justify-center h-96">
            <SpinnerLoading size="8" label="Loading submissions" />
          </div>
        ) : (
          <>
            {filteredReports && filteredReports.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredReports.map((item) => (
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
