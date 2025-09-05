"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { useReport } from "./hooks/useReport";
import SelectOption from "@/components/form/SelectOption";
import { ReportCategoryOptions } from "@/types/report";

export default function ReportPage() {
  const { register, handleSubmit, errors } = useReport();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-slate-200">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            📝 Write Your Report
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-md fontsemibold">
            Provide detailed information and supporting files for your report
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Input
              type="text"
              placeholder="Enter your report title"
              label="Title"
              {...register("title", { required: true })}
              error={errors.title ? "Title is required" : ""}
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
              options={ReportCategoryOptions}
              className="py-2"
              required
            />
            <Input
              type="file"
              placeholder="Upload supporting file"
              label="Attachment"
              {...register("file", { required: true })}
              error={errors.file ? "File is required" : ""}
              required
            />
          </div>

          <TextArea
            placeholder="Write a detailed description..."
            label="Description"
            {...register("description", { required: true })}
            error={errors.description ? "Description is required" : ""}
            required
          />

          {/* Submit button */}
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
