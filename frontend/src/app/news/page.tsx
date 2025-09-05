"use client";
import NewsCard from "@/components/cards/news";
import Modal from "@/components/modal/modal";
import Navbar from "@/components/semantic/Navbar";
import {
  useAddNewsCommentMutation,
  useNewsCommentsMutation,
  useNewsQuery,
} from "./hooks/mutation";
import { formatToUSDate } from "@/utils/dateFormatter";
import { useState } from "react";
import CommentSection from "./components/CommentSection";
import { useQueryClient } from "@tanstack/react-query";
import { News } from "@/types/news";

export default function NewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsId, setNewsId] = useState(0);
  const { data: news } = useNewsQuery();
  const { mutateAsync: mutateAsyncCommentsQuery, data: comments } =
    useNewsCommentsMutation();
  const { mutateAsync: mutateAsyncAddComment } = useAddNewsCommentMutation();
  const queryClient = useQueryClient();

  const closeModal = () => {
    setIsModalOpen(false);
    setNewsId(0);
  };

  const openCommentModal = async (id: number) => {
    setIsModalOpen(true);
    setNewsId(id);
    await mutateAsyncCommentsQuery(id);
  };

  const onAddComment = async (content: string) => {
    const res = await mutateAsyncAddComment({ newsId, content });
    if (res) {
      await mutateAsyncCommentsQuery(newsId);

      // update comment count tanpa refetch (akses langsung ke cache)
      queryClient.setQueryData<News[]>(["news"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((news) =>
          news.id === newsId
            ? { ...news, commentCount: (news.commentCount ?? 0) + 1 }
            : news
        );
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden flex justify-center">
        <div className="mt-24 md:border border-gray-300 rounded-2xl w-full md:w-xl flex flex-col">
          {news &&
            news.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                date={formatToUSDate(news.date)}
                imageUrl={news.imageUrl || ""}
                content={news.content}
                reactionCount={news.reactionCount || 0}
                commentCount={news.commentCount || 0}
                onCommentClick={() => openCommentModal(news.id)}
              />
            ))}
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Comments">
            <CommentSection
              comments={comments?.data || []}
              description="biuasdbfibdfuiseabf"
              onAddComment={onAddComment}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
