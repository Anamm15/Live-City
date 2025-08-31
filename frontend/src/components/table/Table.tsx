import { useState, useMemo } from "react";
import THead from "./THead";
import TBody from "./TBody";
import Pagination from "../pagination/Pagination";

const Table = ({ data, className }: { data: never[]; className?: string }) => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // total halaman
  const totalPages = Math.ceil(data.length / limit);

  // data sesuai halaman
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  }, [data, currentPage]);

  // ambil kolom otomatis dari object pertama
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <table className={`divide-y divide-gray-200 border rounded-lg overflow-hidden ${className}`}>
        <THead columnsData={columns} />
        <TBody data={paginatedData} isLoading={false} />
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
