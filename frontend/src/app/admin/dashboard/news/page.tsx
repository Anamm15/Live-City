"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import { News } from "@/types/news";
import DeleteAlert from "../components/DeleteAlert";
import NewsCard from "./components/NewsCard";
import NewsModal from "./components/NewsModal";
import Button from "@/components/buttons/Button";
import { useNewsQuery } from "./hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";

export default function NewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const { data: newsData, isLoading, refetch } = useNewsQuery();

  const handleAddNew = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleEdit = (news: News) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleDelete = (news: News) => {
    setSelectedNews(news);
    setIsDeleteAlertOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseDeleteAlert = () => setIsDeleteAlertOpen(false);

  const handleConfirmDelete = () => {
    if (!selectedNews) return;
    newsData?.filter((n) => n.id !== selectedNews.id);
    toast.success("Berita berhasil dihapus.");
    handleCloseDeleteAlert();
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl 2xl:text-4xl font-bold text-slate-800">
              Manage News
            </h1>
            <p className="text-slate-500 mt-1 text-lg">
              Create, edit and manage all news to be displayed on public pages.
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            className="mt-4 md:mt-0 inline-flex items-center justify-center gap-2 text-sm"
          >
            <PlusCircle className="w-5 h-5" />
            Create News
          </Button>
        </div>

        <main>
          {isLoading ? (
            <div className="w-full h-96 flex items-center justify-center">
              <SpinnerLoading size="8" label="Loading news..." />
            </div>
          ) : (
            <>
              {newsData && newsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsData?.map((news) => (
                    <NewsCard
                      key={news.id}
                      news={news}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-6 bg-white rounded-2xl border-2 border-dashed">
                  <h3 className="text-2xl font-bold text-slate-800">
                    No News Yet
                  </h3>
                  <p className="mt-2 text-slate-500 max-w-md mx-auto">
                    Click the &quot; Create New News &quot; button to add your
                    first news story.
                  </p>
                </div>
              )}
            </>
          )}
        </main>

        {/* --- MODAL UNTUK CREATE/UPDATE --- */}
        <NewsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          news={selectedNews}
          refetch={refetch}
        />

        {/* --- ALERT UNTUK DELETE --- */}
        {isDeleteAlertOpen && selectedNews && (
          <DeleteAlert
            onClose={handleCloseDeleteAlert}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}
