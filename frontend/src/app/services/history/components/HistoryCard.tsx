import { FaChevronRight } from "react-icons/fa";
import getTypeIcon from "./TypeIcon";
import { getStatusBadge } from "@/utils/statusBadge";
import { Submission } from "@/types/submission";
import { Report } from "@/types/report";

export type HistoryItem = (Submission | Report) & { type: string };

export default function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:border-indigo-300 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
            {getTypeIcon(item.type)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-800 text-md truncate">
              {item.title}
            </p>
            <p className="text-sm text-gray-500">
              ID: {item.shortId} &bull;{" "}
              {new Date(item.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 self-end sm:self-center">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusBadge(
              item.status
            )}`}
          >
            {item.status}
          </span>
          <FaChevronRight className="text-gray-400 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
