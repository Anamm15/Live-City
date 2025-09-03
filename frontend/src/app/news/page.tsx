"use client";
import NewsCard from "@/components/cards/news";
import Modal from "@/components/modal/modal";
import Navbar from "@/components/semantic/Navbar";
import { useEffect, useState } from "react";
import { useNewsQuery } from "./hooks/mutation";
import { formatToUSDate } from "../utils/dateFormatter";

export default function News() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);
  const { data, isLoading, error } = useNewsQuery();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden flex justify-center">
        <div className="mt-24 md:border border-gray-300 rounded-2xl w-full md:w-xl flex flex-col">
          {data &&
            data.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                date={formatToUSDate(news.date)}
                imageUrl={news.imageUrl || ""}
                content={news.content}
                reactionCount={news.reactionCount || 0}
                commentCount={news.commentCount || 0}
                setIsModalOpen={setIsModalOpen}
                setCommentId={setCommentId}
              />
            ))}
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Comments">
            <div className="p-4">
              <div className="mt-2">
                {commentId && <p>Comments for News ID: {commentId}</p>}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
