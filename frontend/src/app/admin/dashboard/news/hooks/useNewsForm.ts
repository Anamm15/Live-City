import { News, NewsFormData } from "@/types/news";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNewsMutation, useNewsUpdateMutation } from "./mutation";

type UseNewsFormProps = {
  news: News | null;
  onSuccess: () => void;
  refetch: () => void;
};

export function useNewsForm({ news, onSuccess, refetch }: UseNewsFormProps) {
  const isEditMode = !!news;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsFormData>();

  useEffect(() => {
    if (isEditMode) {
      reset({
        title: news.title,
        content: news.content,
        date: new Date(news.date).toISOString().substring(0, 10),
      });
    } else {
      reset({
        title: "",
        content: "",
        date: "",
        file: undefined,
      });
    }
  }, [news, isEditMode, reset]);

  const { mutate: mutateAdd, isPending: isAdding } = useNewsMutation();
  const { mutate: mutateUpdate, isPending: isUpdating } =
    useNewsUpdateMutation();

  const onSubmit = (data: NewsFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("date", data.date);

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (isEditMode) {
      mutateUpdate(
        { id: news.id, data },
        {
          onSuccess: () => {
            reset();
            onSuccess();
            refetch();
          },
        }
      );
    } else {
      mutateAdd(formData, {
        onSuccess: () => {
          reset();
          onSuccess();
          refetch();
        },
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isAdding || isUpdating,
    isEditMode,
  };
}
