import { FaNewspaper } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="text-center py-20 px-6 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
      <FaNewspaper className="mx-auto text-5xl text-slate-300 dark:text-slate-600 mb-4" />
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
        Data Not Found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Try to change the search keyword or filter status.
      </p>
    </div>
  );
}
