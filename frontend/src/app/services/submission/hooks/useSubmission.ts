import { SubmissionFormData } from "@/types/submission";
import { useForm } from "react-hook-form";
import { useSubmissionMutation } from "./mutation";

export function useSubmission() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubmissionFormData>({
    defaultValues: {
      title: "",
      content: "",
      date: "",
      category: "",
      file: undefined,
      description: "",
    },
  });

  const { mutate, isPending, isError, isSuccess, error } =
    useSubmissionMutation();

  const onSubmit = (data: SubmissionFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "file" && value instanceof FileList && value.length > 0) {
        formData.append("file", value[0]);
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });
    mutate(formData, {
      onSuccess: () => reset(),
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isPending,
    isError,
    isSuccess,
    error,
  };
}
