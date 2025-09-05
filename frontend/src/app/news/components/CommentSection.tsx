"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Comment {
  id: number;
  user: {
    name: string;
  };
  content: string;
}

interface CommentSectionProps {
  description: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export default function CommentSection({
  description,
  comments,
  onAddComment,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="flex p-2 md:p-5 flex-col min-h-[20rem] w-full mt-2">
      <div className="py-4 border-b">
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            Belum ada komentar
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col bg-gray-50 rounded-xl p-3 shadow-sm"
          >
            <span className="text-sm font-semibold text-gray-800">
              {comment.user?.name}
            </span>
            <span className="text-sm text-gray-600">{comment.content}</span>
          </div>
        ))}
      </div>

      <div className="border-t bg-white py-3 sticky bottom-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            className="flex-1 px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
