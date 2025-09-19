"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import FilteredSection from "./components/FilteredSection";
import { useSubmissionQuery } from "./mutation/useSubmission";
import { useReportsQuery } from "./mutation/useReport";
import { mergeServices } from "./utils/mergeServices";
import ServiceCard from "@/components/cards/ServicesCard";
import { Submission } from "@/types/submission";
import { Report } from "@/types/report";

export type HistoryItem = (Submission | Report) & { type: string };
export default function HistoryPage() {
  const [filter, setFilter] = useState("All");
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const { data: submissions } = useSubmissionQuery();
  const { data: reports } = useReportsQuery();

  useEffect(() => {
    if (submissions || reports) {
      setHistoryData(mergeServices(submissions, reports));
    }
  }, [submissions, reports]);

  const filteredData = useMemo(() => {
    if (filter === "All") {
      return historyData;
    }
    return historyData.filter((item) => item.type === filter);
  }, [filter, historyData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Activity History
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track all your reports and submissions in one place.
          </p>
        </header>

        <FilteredSection filter={filter} setFilter={setFilter} />

        {/* History List */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Link
                href={`/history/${item.id}`}
                key={item.shortId}
                className="block group"
              >
                <ServiceCard item={item} />
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada data untuk filter ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
