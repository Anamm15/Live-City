"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { useSubmission } from "./hooks/useSubmission";
import SelectOption from "@/components/form/SelectOption";
import { SubmissionCategoryOptions } from "@/types/submission";
import { useEffect } from "react";

export default function SubmissionPage() {
  const { register, handleSubmit, errors } = useSubmission();

  useEffect(() => {
    console.log("SubmissionCategoryOptions:", SubmissionCategoryOptions);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-slate-200">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            ✍️ Write Your Submission
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-md fontsemibold">
            Share your thoughts, ideas, or reports in a structured way
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Grid inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="Enter your submission title"
              label="Title"
              {...register("title", { required: true })}
              error={errors.title ? "Title is required" : ""}
              required
            />
            <Input
              type="text"
              placeholder="Enter your content"
              label="Content"
              {...register("content", { required: true })}
              error={errors.content ? "Content is required" : ""}
              required
            />
            <Input
              type="date"
              label="Date"
              {...register("date", { required: true })}
              error={errors.date ? "Date is required" : ""}
              required
            />
            <SelectOption
              placeholder="Choose a category"
              label="Category"
              {...register("category", { required: true })}
              error={errors.category ? "Category is required" : ""}
              options={SubmissionCategoryOptions}
              className="py-2"
              required
            />
          </div>

          {/* File upload */}
          <Input
            type="file"
            placeholder="Upload file"
            label="Attachment"
            className="w-full"
            {...register("file")}
            error={errors.file ? "File is required" : ""}
          />

          {/* Description */}
          <TextArea
            placeholder="Write a detailed description..."
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description ? "Description is required" : ""}
            required
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" className="w-40 py-2.5 ease-in-out">
              🚀 Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
