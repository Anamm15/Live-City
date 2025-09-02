import { ReportFormData } from "@/types/report";
import { useForm } from "react-hook-form";
import { useReportMutation } from "./mutation";

export function useReport() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReportFormData>({
    defaultValues: {
      title: "",
      date: "",
      category: "",
      file: undefined,
      description: "",
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = useReportMutation();

  const onSubmit = (data: ReportFormData) => {
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
