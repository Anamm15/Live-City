import { Poll, PollCreateFormData } from "@/types/polls";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePollAddMutation, usePollUpdateMutation } from "./mutation";

type UsePollFormProps = {
  poll: Poll | null;
  onSuccess: () => void;
  refetch: () => void;
};

export function usePollForm({ poll, onSuccess, refetch }: UsePollFormProps) {
  const isEditMode = !!poll;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<PollCreateFormData>({
    defaultValues: {
      title: "",
      description: "",
      type: "VOTING",
      options: [{ label: "" }, { label: "" }],
      status: "CLOSED",
    },
  });

  useEffect(() => {
    if (isEditMode && poll) {
      reset({
        title: poll.title,
        description: poll.description,
        type: poll.type,
        options:
          poll.options.length > 0
            ? poll.options
            : [{ label: "" }, { label: "" }],
        status: poll.status,
      });
    }
  }, [poll, isEditMode, reset]);

  const { mutate: mutateAdd, isPending: isAdding } = usePollAddMutation();
  const { mutate: mutateUpdate, isPending: isUpdating } =
    usePollUpdateMutation();

  const onSubmit = (data: PollCreateFormData) => {
    if (isEditMode && poll) {
      mutateUpdate(
        { id: poll.id, data },
        {
          onSuccess: () => {
            reset();
            onSuccess();
            refetch();
          },
        }
      );
    } else {
      mutateAdd(data, {
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
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isAdding || isUpdating,
    isEditMode,
  };
}
