import React from "react";
import { FaNewspaper, FaInbox, FaFlag, FaPoll } from "react-icons/fa";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total News",
      value: "1,200",
      icon: FaNewspaper,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "New Submissions",
      value: "45",
      icon: FaInbox,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Open Reports",
      value: "12",
      icon: FaFlag,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Active Polls",
      value: "5",
      icon: FaPoll,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="text-2xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold border-b pb-4 mb-4">
            Recent Submissions & Reports
          </h3>
          {/* List item contoh */}
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4 flex items-center justify-between">
              <div>
                <p className="font-medium">
                  User &apos;John Doe&apos; submitted a new article.
                </p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <span className="text-sm text-indigo-600">Pending</span>
            </li>
            <li className="py-4 flex items-center justify-between">
              <div>
                <p className="font-medium">
                  New report about a broken facility.
                </p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
              <span className="text-sm text-red-600">Open</span>
            </li>
          </ul>
        </div>

        {/* Quick Links / Statuses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold border-b pb-4 mb-4">
            Quick Actions
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                View All Submissions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Review Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Add New News
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
