const TBody = (props) => {
   const { data, isLoading } = props;
   return (
      <tbody>
         {
            isLoading ? (
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loading...</td>
               </tr>
            ) : (
               data.length === 0 ? (
                  <tr>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No data</td>
                  </tr>
               ) : (
                  data.map((item, index) => (
                     <tr key={index}>
                        {
                           Object.values(item).map((value, idx) => (
                              <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                           ))
                        }
                     </tr>
                  ))
               )
            )
         }
      </tbody>
   )
}

export default TBody;