"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { Poll } from "@/types/polls";
import {
  useDeleteVotePollMutation,
  useVotePollMutation,
} from "../hooks/mutation";

interface PollCardProps {
  initialPollData: Poll;
}

export function PollCard({ initialPollData }: PollCardProps) {
  const [poll, setPoll] = useState(initialPollData);
  const [selectedOption, setSelectedOption] = useState<number | null>(
    initialPollData.selectedOptionId ?? null
  );

  const [hasVoted, setHasVoted] = useState(
    initialPollData.selectedOptionId !== null
  );

  const { mutate: votePoll } = useVotePollMutation();
  const { mutate: deleteVotePoll } = useDeleteVotePollMutation();

  const totalVotes =
    poll.options.reduce((acc, option) => acc + option.voteCount, 0) +
    (hasVoted && !initialPollData.options.find((o) => o.id === selectedOption)
      ? 1
      : 0);

  const handleVote = (optionId: number) => {
    if (poll.status === "CLOSED" || optionId === selectedOption) return;
    const previousSelectedOptionId = selectedOption;
    setSelectedOption(optionId);
    try {
      votePoll({
        id: poll.id,
        data: {
          pollOptionId: optionId,
        },
      });

      setHasVoted(true);
      setPoll((prevPoll) => ({
        ...prevPoll,
        options: prevPoll.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, voteCount: opt.voteCount + 1 };
          }

          if (opt.id === previousSelectedOptionId) {
            return { ...opt, voteCount: opt.voteCount - 1 };
          }

          return opt;
        }),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearVote = () => {
    try {
      deleteVotePoll(poll.id);
      setPoll((initialPollData) => ({
        ...initialPollData,
        options: initialPollData.options.map((opt) => {
          if (opt.id === selectedOption) {
            return { ...opt, voteCount: opt.voteCount - 1 };
          }
          return opt;
        }),
      }));
      setSelectedOption(null);
      setHasVoted(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl shadow-sm w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">{poll.title}</h2>
        <p className="mt-1 text-gray-600">{poll.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs">
          <span
            className={`font-semibold px-2 py-1 rounded-full ${
              poll.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {poll.status}
          </span>
          <span
            className={`font-semibold px-2 py-1 rounded-full ${
              poll.type === "VOTING"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {poll.type}
          </span>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar size={14} />
            <span className="font-medium">
              {poll.startDate} - {poll.endDate}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {poll.options.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
          const isSelected = selectedOption === option.id;

          return (
            <motion.div
              key={option.id}
              onClick={() => handleVote(option.id)}
              className={`relative overflow-hidden rounded-lg border transition-colors duration-300 ${
                poll.status === "ACTIVE" && !hasVoted
                  ? "cursor-pointer"
                  : "cursor-default"
              } ${
                isSelected && hasVoted ? "border-green-300" : "border-gray-200"
              }`}
              whileHover={
                poll.status === "ACTIVE" ? { borderColor: "#10B981" } : {}
              }
              layout // Penting untuk animasi posisi
            >
              {/* Background bar animasi untuk hasil */}
              {hasVoted && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-green-100"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // easing yang lebih halus
                />
              )}

              <div className="relative z-10 flex items-center justify-between p-4 min-h-[52px]">
                <motion.div layout="position" className="flex items-center">
                  {/* ANIMASI UNTUK LINGKARAN PEMILIH */}
                  <AnimatePresence>
                    {!hasVoted && (
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-4 ${
                          isSelected
                            ? "border-green-500 bg-green-100"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  </AnimatePresence>

                  <span
                    className={`font-semibold ${
                      isSelected && hasVoted
                        ? "text-green-900"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </motion.div>

                {/* ANIMASI UNTUK JUMLAH SUARA (VOTE COUNT) */}
                <AnimatePresence>
                  {hasVoted && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="flex items-center space-x-3"
                    >
                      <span
                        className={`text-sm font-bold ${
                          isSelected ? "text-green-800" : "text-gray-600"
                        }`}
                      >
                        {option.voteCount}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={handleClearVote}
        className="px-8 text-sm mb-4 text-green-600 cursor-pointer hover:text-green-400"
      >
        Clear Your Choice
      </button>

      <div className="border-t border-gray-100 px-6 py-3">
        <p className="text-sm text-gray-500">Total Suara: {totalVotes}</p>
      </div>
    </motion.div>
  );
}
