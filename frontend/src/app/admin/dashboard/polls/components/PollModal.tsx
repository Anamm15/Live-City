"use client";
import type { Poll } from "@/types/polls";
import { XMarkIcon, PlusIcon, TrashIcon } from "@/components/icons/icons";
import { usePollForm } from "../hooks/usePollForm";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import SelectOption from "@/components/form/SelectOption";
import { useFieldArray } from "react-hook-form";
import TextArea from "@/components/form/TextArea";

type PollModalProps = {
  poll: Poll | null;
  onClose: () => void;
  refetch: () => void;
};

export default function PollModal({ poll, onClose, refetch }: PollModalProps) {
  const { register, handleSubmit, control, errors } = usePollForm({
    poll,
    onSuccess: onClose,
    refetch,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
    rules: { minLength: 2 },
  });

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-5 border-b">
            <h3 className="text-xl font-bold text-slate-800">
              {poll ? "Update Poll" : "Add New Poll"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <Input
              type="text"
              label="Question"
              placeholder="Enter your question"
              {...register("title", { required: true })}
            />
            <TextArea
              label="Description"
              placeholder="Enter your description"
              {...register("description", { required: true })}
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Opsi Jawaban
              </label>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    {" "}
                    <input
                      {...register(`options.${index}.label`, {
                        required: "Opsi tidak boleh kosong",
                      })}
                      className="flex-grow px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Opsi ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 2}
                      className="p-2 text-slate-500 rounded-md hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => append({ label: "" })}
                className="text-sm mt-3 inline-flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Option
              </Button>
              {errors.options?.root && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.options.root.message ||
                    "Polling harus memiliki minimal 2 opsi."}
                </p>
              )}
            </div>
            <SelectOption
              options={[
                { value: "VOTING", label: "Voting" },
                { value: "SURVEY", label: "Survey" },
              ]}
              label="Type"
              {...register("type")}
            />
            <SelectOption
              options={[
                { value: "ACTIVE", label: "Active" },
                { value: "CLOSED", label: "Closed" },
              ]}
              label="Status"
              {...register("status")}
            />
          </div>

          <div className="flex justify-end items-center gap-3 p-5 border-t bg-slate-50 rounded-b-xl">
            <Button type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
