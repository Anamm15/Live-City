"use client";

import { useState } from "react";
import type { Poll } from "@/types/polls"; // Sesuaikan dengan path tipe data Anda
import {
  Pencil,
  Trash2,
  MoreVertical,
  ChevronDown,
  Users,
  CalendarDays,
  BarChartBig,
} from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants } from "@/components/supports/FramerMotionVariants";

// Tipe data props tetap sama
type PollsListProps = {
  polls: Poll[];
  onEdit: (poll: Poll) => void;
  onDelete: (poll: Poll) => void;
};

// --- Komponen-komponen Pendukung ---
// 1. StatusBadge yang sedikit disempurnakan
const StatusBadge = ({ status }: { status: "ACTIVE" | "CLOSED" }) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5 tracking-wide";
  const statusConfig = {
    ACTIVE: {
      classes: "bg-teal-100 text-teal-800",
      text: "Active",
      dot: (
        <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
      ),
    },
    CLOSED: {
      classes: "bg-slate-200 text-slate-700",
      text: "Closed",
      dot: <span className="w-2 h-2 bg-slate-500 rounded-full"></span>,
    },
  };
  const config = statusConfig[status];
  return (
    <span className={`${baseClasses} ${config.classes}`}>
      {config.dot}
      {config.text}
    </span>
  );
};

// 2. Komponen untuk menampilkan hasil per opsi (dengan progress bar)
const PollOptionResult = ({
  option,
  totalVotes,
}: {
  option: { label: string; voteCount: number };
  totalVotes: number;
}) => {
  const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-700">{option.label}</span>
        <span className="font-semibold text-slate-800">
          {option.voteCount} Suara
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div
          className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// 3. Komponen utama untuk setiap item polling (Kartu Interaktif)
const PollItem = ({
  poll,
  onEdit,
  onDelete,
}: { poll: Poll } & Omit<PollsListProps, "polls">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.voteCount, 0);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-slate-800 mb-1">
            {poll.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <StatusBadge status={poll.status} />
            <span className="flex items-center gap-1.5">
              <Users size={14} /> {totalVotes} Total Suara
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} /> Dibuat{" "}
              {new Date(poll.startDate).toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* --- Aksi dan Tombol Expand --- */}
        <div className="flex items-center gap-2 ml-4">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white transition-colors"
            >
              <MoreVertical size={20} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                <button
                  onMouseDown={() => {
                    onEdit(poll);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer rounded-t-lg w-full"
                >
                  <Pencil size={16} /> Update
                </button>
                <button
                  onMouseDown={() => {
                    onDelete(poll);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-lg w-full"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
          <ChevronDown
            size={24}
            className={`text-slate-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-slate-200/80 p-5 space-y-4">
          <h4 className="font-semibold text-slate-600">Hasil Suara:</h4>
          {poll.options.map((option) => (
            <PollOptionResult
              key={option.id}
              option={option}
              totalVotes={totalVotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Komponen Empty State yang lebih menarik
const EmptyState = () => (
  <div className="text-center py-20 px-6 bg-slate-50 rounded-2xl border-2 border-dashed">
    <div className="inline-block p-5 bg-sky-100 rounded-full">
      <BarChartBig className="w-12 h-12 text-sky-600" />
    </div>
    <h3 className="mt-4 text-2xl font-bold text-slate-800">
      Belum Ada Polling
    </h3>
    <p className="mt-2 text-slate-500 max-w-md mx-auto">
      Sepertinya Anda belum membuat polling apapun. Mulailah dengan membuat
      polling pertama Anda untuk berinteraksi dengan audiens!
    </p>
  </div>
);

export default function PollsList({ polls, onEdit, onDelete }: PollsListProps) {
  return (
    <motion.div variants={itemVariants}>
      <div className="space-y-4">
        {polls.length === 0 ? (
          <EmptyState />
        ) : (
          polls.map((poll) => (
            <PollItem
              key={poll.id}
              poll={poll}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
