"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { useSubmission } from "./hooks/useSubmission";
import SpinnerLoading from "@/components/loading/SpinnerLoading";
import { Message } from "@/components/form/Message";

export default function SubmissionPage() {
  const { 
    register, 
    handleSubmit, 
    errors, 
    isSubmitting,
    isError,
    isSuccess } = useSubmission();

  return (
    <div className="ps-40 mt-8">
      <h1 className="text-3xl font-bold tracking-tight text-black">
        Write Your Submission
      </h1>
      
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mt-5 flex flex-col justify-end">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
          <Input
            type="text"
            placeholder="Enter your category"
            label="Category"
            {...register("category", { required: true })}
            error={errors.category ? "Category is required" : ""}
            required
          />
        </div>
        <Input
          type="file"
          placeholder="Enter file"
          label="File"
          className="w-[calc(50%-0.5rem)]"
          {...register("file")}
          error={errors.file ? "File is required" : ""}
          required
        />
        <TextArea
          placeholder="Enter description"
          label="Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description ? "Description is required" : ""}
          required
        />
        <Button type="submit" className="w-40">
          Submit
        </Button>
        {isSubmitting && <SpinnerLoading />}
        {isError && <Message type="error" text="Submission failed. Please try again." />}
        {isSuccess && <Message type="success" text="Submission successful!" />}
      </form>
    </div>
  );
}