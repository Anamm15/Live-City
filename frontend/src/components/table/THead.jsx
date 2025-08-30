const THead = (props) => {
   const { columnsData } = props;

   return (
      <thead>
         <tr key="">
            {
               columnsData.map((column, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column}</th>
               ))
            }
         </tr>
      </thead>
   )
};

export default THead;