import LabelText from "./LabelText";

const SelectOption = (props) => {
   const {
      id,
      label,
      helperText,
      hideError = false,
      validation,
      className,
      readOnly = false,
      defaultValue = '',
      placeholder = '',
      options,
      optionKey,
      optionValue,
      optionLabel
   } = props;

   return (
      <div className="mb-4 flex flex-col space-y-2">
         <LabelText id={label}>{label}</LabelText>
         <div className={`relative ${className}`}>
            <select
               id={label}
               name={label}
               readOnly={readOnly}
               className={`appearance-none w-full px-3 py-2 border border-[#808080] rounded-md 
                        focus:outline-1 focus:outline-primary-info-active focus:ring-inset 
                        hover:ring-1 hover:ring-inset hover:ring-[#000] 
                        placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540] 
                        pr-10`}
               defaultValue={defaultValue}
               aria-label={label}
               aria-describedby={helperText ? `${id}-helper` : ''}
               aria-invalid={validation && !hideError ? "true" : "false"}
            >
               {placeholder && (
                  <option value="" disabled hidden>
                     {placeholder}
                  </option>
               )}
               {options.map((option) => (
                  <option
                     key={option[optionKey]}
                     value={option[optionValue]}
                  >
                     {option[optionLabel]}
                  </option>
               ))}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-10">
               <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M19 9l-7 7-7-7"
                  />
               </svg>
            </span>
         </div>
      </div>
   );
};

export default SelectOption;
