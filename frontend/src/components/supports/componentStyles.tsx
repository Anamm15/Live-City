import { FaNewspaper, FaPoll, FaInfoCircle } from "react-icons/fa";

export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300";
    case "in_progress":
    case "processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
  }
}

export function getTypeIcon(type: string) {
  const iconProps = { className: "w-6 h-6" };
  console.log("type:", type);
  switch (type.toLowerCase()) {
    case "report":
      return <FaNewspaper {...iconProps} />;
    case "submission":
      return <FaPoll {...iconProps} />;
    case "village info":
      return <FaInfoCircle {...iconProps} />;
    default:
      return null;
  }
}

export function getTypeStyles(type: string) {
  switch (type.toLowerCase()) {
    case "report":
      return { iconColor: "text-indigo-500", bgColor: "bg-indigo-500/10" };
    case "submission":
      return { iconColor: "text-teal-500", bgColor: "bg-teal-500/10" };
    case "village info":
      return { iconColor: "text-purple-500", bgColor: "bg-purple-500/10" };
    default:
      return { iconColor: "", bgColor: "" };
  }
}
