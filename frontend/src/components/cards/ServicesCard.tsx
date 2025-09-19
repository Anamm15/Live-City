import { Report } from "@/types/report";
import { Submission } from "@/types/submission";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight, FaUserCircle } from "react-icons/fa";
import {
  getStatusBadge,
  getTypeIcon,
  getTypeStyles,
} from "../supports/componentStyles";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const ServiceCard = ({
  item,
}: {
  item: (Report | Submission) & { type: string };
}) => {
  const { iconColor, bgColor } = getTypeStyles(item.type);

  return (
    <motion.div variants={itemVariants}>
      <Link href={`/admin/dashboard/${item.type.toLowerCase()}s/${item.id}`}>
        <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500 hover:-translate-y-1 cursor-pointer">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`flex-shrink-0 p-4 rounded-full ${bgColor} ${iconColor}`}
              >
                {getTypeIcon(item.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-800 dark:text-gray-100 text-lg truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaUserCircle className="text-gray-400" />
                    <span>{item.user.name}</span>
                  </div>
                  <span>&bull;</span>
                  <span>
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0 self-end sm:self-center">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
              <FaChevronRight className="text-gray-400 dark:text-gray-500 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-indigo-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
