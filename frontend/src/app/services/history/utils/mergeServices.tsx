import { Report } from "@/types/report";
import { Submission } from "@/types/submission";
import { HistoryItem } from "../components/HistoryCard";

export function mergeServices(
  submissions?: Submission[],
  reports?: Report[]
): HistoryItem[] {
  const historyItems: HistoryItem[] = [];
  if (submissions) {
    const newSubmissions = submissions.map((submission) => {
      return {
        ...submission,
        type: "Submission",
      };
    });

    historyItems.push(...newSubmissions);
  }

  if (reports) {
    const newReports = reports.map((report) => {
      return {
        ...report,
        type: "Report",
      };
    });

    historyItems.push(...newReports);
  }

  return historyItems;
}
