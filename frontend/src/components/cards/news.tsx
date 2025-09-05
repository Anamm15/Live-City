import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Calendar,
  Send,
} from "lucide-react";
import Image from "next/image";

type NewsProps = {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  reactionCount: number;
  commentCount: number;
  onCommentClick?: () => void;
};

export default function NewsCard({
  title,
  date,
  content,
  imageUrl,
  reactionCount,
  commentCount,
  onCommentClick,
}: NewsProps) {
  return (
    <div className="w-full h-max py-2">
      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <h2 className="text-md font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className="mt-0.5 ">
              {new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {imageUrl && (
        <div className="w-full h-64 bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            layout="fill"
          />
        </div>
      )}

      <div className="px-4 py-3">
        <p className="text-gray-700 line-clamp-3">{content}</p>
      </div>

      <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-100">
        <button className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-red-500 transition">
          <Heart className="w-6 h-6" />
          <span className="text-sm">{reactionCount}</span>
        </button>
        <button
          onClick={onCommentClick}
          className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-blue-600 transition"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm">{commentCount}</span>
        </button>
        <button className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-accent transition">
          <Send className="w-6 h-6" />
          <span className="text-sm">{commentCount}</span>
        </button>
      </div>
    </div>
  );
}
