"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { useReport } from "./hooks/useReport";

export default function ReportPage() {
  const { register, handleSubmit, errors } = useReport();

  return (
    <div className="ps-40 mt-8">
      <h1 className="text-3xl font-bold tracking-tight text-black">
        Write Your Report
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-3/4 mt-5 flex flex-col justify-end"
      >
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
            {...register("date", { required: true })}
            error={errors.date ? "Date is required" : ""}
            label="Date"
            required
          />
          <Input
            type="text"
            placeholder="Enter your category"
            label="Category"
            {...register("category", { required: true })}
            error={errors.category ? "Category is required" : ""}
            required
          />
          <Input
            type="file"
            placeholder="Enter file"
            label="File"
            {...register("file", { required: true })}
            error={errors.file ? "File is required" : ""}
            required
          />
        </div>
        <TextArea
          placeholder="Enter description"
          label="Description"
          {...register("description", { required: true })}
          error={errors.description ? "Description is required" : ""}
          required
        />
        <Button type="submit" className="w-40">
          Submit
        </Button>
      </form>
    </div>
  );
}
