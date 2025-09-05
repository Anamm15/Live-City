import Button from "@/components/buttons/Button";

type FilteredSectionProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export default function FilteredSection({
  filter,
  setFilter,
}: FilteredSectionProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
      <Button
        onClick={() => setFilter("All")}
        className={`text-sm ${
          filter !== "All" ? "text-gray-700 bg-white" : ""
        }`}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter("Report")}
        className={`text-sm ${
          filter !== "Report" ? "text-gray-700 bg-white" : ""
        }`}
      >
        Report
      </Button>
      <Button
        onClick={() => setFilter("Submission")}
        className={`text-sm ${
          filter !== "Submission" ? "text-gray-700 bg-white" : ""
        }`}
      >
        Submission
      </Button>
    </div>
  );
}
