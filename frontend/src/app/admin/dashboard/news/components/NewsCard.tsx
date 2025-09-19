"use client";

import Image from "next/image";
import { News } from "@/types/news";
import {
  Calendar,
  Heart,
  MessageSquare,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type NewsCardProps = {
  news: News;
  onEdit: (news: News) => void;
  onDelete: (news: News) => void;
};

export default function NewsCard({ news, onEdit, onDelete }: NewsCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const date = new Date(news.date);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {news.files?.length ? (
          <Image
            src={news.files[0].urlFile}
            alt={news.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400">
            <span>No Image</span>
          </div>
        )}

        {/* Action Menu Dropdown */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white transition-colors"
          >
            <MoreVertical size={20} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              <button
                onMouseDown={() => {
                  onEdit(news);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer rounded-t-lg w-full"
              >
                <Pencil size={16} /> Update
              </button>
              <button
                onMouseDown={() => {
                  onDelete(news);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-lg w-full"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 h-14 line-clamp-2">
          {news.title}
        </h3>

        <div className="flex items-center text-sm text-slate-500 mt-3 gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Heart size={16} className="text-red-500" />
            <span className="font-medium">{news.reactionCount}</span>
            <span className="text-slate-500">Reaction</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <MessageSquare size={16} className="text-sky-500" />
            <span className="font-medium">{news.commentCount}</span>
            <span className="text-slate-500">Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
