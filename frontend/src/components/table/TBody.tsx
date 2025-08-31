// components/TBody.tsx
"use client";

import React from "react";

interface TBodyProps<T> {
   data: T[];
   isLoading: boolean;
}

const TBody = <T extends Record<string, unknown>>({
   data,
   isLoading,
}: TBodyProps<T>) => {
   return (
      <tbody>
         {isLoading ? (
            <tr>
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Loading...
               </td>
            </tr>
         ) : data.length === 0 ? (
            <tr>
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  No data
               </td>
            </tr>
         ) : (
            data.map((item, index) => (
               <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                     <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                     >
                        {String(value)}
                     </td>
                  ))}
               </tr>
            ))
         )}
      </tbody>
   );
};

export default TBody;
