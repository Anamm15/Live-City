const Button = (props) => {
   const { className, onClick, children } = props;

   return (
      <button
         className={`shadow-md px-4 py-2 cursor-pointer bg-accent rounded-lg font-semibold text-black transition-colors duration-300
         hover:bg-accent-hover  ${className}`}
         onClick={onClick}
         type="button">
         {children}
      </button>
   )
}

export default Button;