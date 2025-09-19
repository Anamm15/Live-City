"use client";

import { News } from "@/types/news";
import { X } from "lucide-react";
import Input from "@/components/form/Input";
import { useNewsForm } from "../hooks/useNewsForm";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/buttons/Button";

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  news: News | null;
  refetch: () => void;
};

export default function NewsModal({
  isOpen,
  onClose,
  news,
  refetch,
}: NewsModalProps) {
  const { register, handleSubmit, errors, isSubmitting, isEditMode } =
    useNewsForm({ news, onSuccess: onClose, refetch });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-bold text-slate-800">
            {isEditMode ? "Edit Berita" : "Buat Berita Baru"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 px-10 space-y-4">
          <Input
            type="text"
            label="Title"
            placeholder="News Title"
            {...register("title", { required: "Judul tidak boleh kosong" })}
            error={errors.title?.message}
          />
          <Input
            type="date"
            label="Date"
            placeholder="News Date"
            {...register("date", { required: "Tanggal tidak boleh kosong" })}
            error={errors.date?.message}
          />
          {!isEditMode && (
            <Input
              type="file"
              label="Image"
              placeholder="News Image"
              {...register("file", { required: "Gambar tidak boleh kosong" })}
              error={errors.file?.message}
            />
          )}
          <TextArea
            label="Content"
            placeholder="News Content"
            {...register("content", { required: "Konten tidak boleh kosong" })}
            error={errors.content?.message}
          />
          <div className="flex justify-end items-center gap-3 pt-4 border-t mt-4">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
