import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = (props) => {
   const {
      currentPage,
      totalPages,
      onPageChange
   } = props;

   return (
      <div className="mt-4 flex justify-center items-center gap-2">
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1
               ? "text-gray-400 cursor-not-allowed"
               : "text-gray-600 hover:bg-gray-200"
               }`}
         >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
         </button>

         {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
               <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page
                     ? "bg-gray-300 text-black"
                     : "hover:bg-gray-200 text-gray-600"
                     }`}
               >
                  {page}
               </button>
            );
         })}

         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages
               ? "text-gray-400 cursor-not-allowed"
               : "text-gray-600 hover:bg-gray-200"
               }`}
         >
            <MdOutlineKeyboardArrowRight className="text-2xl" />
         </button>
      </div>
   )
}

export default Pagination;