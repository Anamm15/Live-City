import { FaFileAlt, FaPaperPlane } from "react-icons/fa";

export default function getTypeIcon(type: string) {
  switch (type.toLowerCase()) {
    case "report":
      return <FaFileAlt className="text-red-500 text-xl" />;
    case "submission":
      return <FaPaperPlane className="text-blue-500 text-xl" />;
    default:
      return null;
  }
}
