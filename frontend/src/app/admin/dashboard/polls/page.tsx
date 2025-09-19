"use client";

import { useState } from "react";
import type { Poll } from "@/types/polls";
import PollsList from "./components/PollsList";
import PollModal from "./components/PollModal";
import DeleteAlert from "../components/DeleteAlert";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Button from "@/components/buttons/Button";
import { usePollQuery } from "./hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import { containerVariants } from "@/components/supports/FramerMotionVariants";

export default function PollsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const { data: polls, isLoading, refetch } = usePollQuery();

  const handleOpenModal = (poll: Poll | null) => {
    setSelectedPoll(poll);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPoll(null);
    setIsModalOpen(false);
  };

  const handleOpenDeleteAlert = (poll: Poll) => {
    setSelectedPoll(poll);
    setIsDeleteAlertOpen(true);
  };

  const handleCloseDeleteAlert = () => {
    setSelectedPoll(null);
    setIsDeleteAlertOpen(false);
  };

  const handleDeletePoll = () => {
    if (selectedPoll) {
      polls?.filter((p) => p.id !== selectedPoll.id);
      handleCloseDeleteAlert();
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl 2xl:text-4xl font-bold text-slate-800">
              Polling Management
            </h1>
            <p className="text-slate-500 mt-1 text-lg">
              Create, manage, and view citizen poll results.
            </p>
          </div>
          <Button
            onClick={() => handleOpenModal(null)}
            className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 text-sm"
          >
            <PlusCircle className="w-5 h-5" />
            Create Polls
          </Button>
        </div>

        <main>
          {isLoading ? (
            <div className="w-full h-96 flex justify-center items-center">
              <SpinnerLoading size="8" label="Loading Polls..." />
            </div>
          ) : (
            <>
              {polls ? (
                <motion.div
                  className="grid grid-cols-1 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <PollsList
                    polls={polls}
                    onEdit={handleOpenModal}
                    onDelete={handleOpenDeleteAlert}
                  />
                </motion.div>
              ) : (
                <div className="text-center py-20 px-6 bg-white rounded-2xl border-2 border-dashed">
                  <h3 className="text-2xl font-bold text-slate-800">
                    No Polls Yet
                  </h3>
                  <p className="mt-2 text-slate-500 max-w-md mx-auto">
                    Click the &quot; Create New Polls &quot; button to add your
                    first polls story.
                  </p>
                </div>
              )}
            </>
          )}
        </main>

        {/* Modal untuk Add/Edit */}
        {isModalOpen && (
          <PollModal
            poll={selectedPoll}
            onClose={handleCloseModal}
            refetch={refetch}
          />
        )}

        {/* Alert untuk Delete */}
        {isDeleteAlertOpen && selectedPoll && (
          <DeleteAlert
            onClose={handleCloseDeleteAlert}
            onConfirm={handleDeletePoll}
          />
        )}
      </div>
    </div>
  );
}
