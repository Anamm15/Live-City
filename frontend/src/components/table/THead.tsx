// components/THead.tsx
"use client";

import React from "react";

interface THeadProps {
   columnsData: string[];
}

const THead: React.FC<THeadProps> = ({ columnsData }) => {
   return (
      <thead>
         <tr>
            {columnsData.map((column, index) => (
               <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
               >
                  {column}
               </th>
            ))}
         </tr>
      </thead>
   );
};

export default THead;
