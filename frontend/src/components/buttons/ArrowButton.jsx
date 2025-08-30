import { CiCircleChevDown } from 'react-icons/ci';

const ArrowButton = (props) => {
   const { className, id } = props

   const handleClick = () => {
      const element = document.getElementById(id);
      if (element) {
         let offset;
         if (window.innerWidth < 1024) {
            offset = element.getBoundingClientRect().top - 64;
         } else {
            offset = element.getBoundingClientRect().top - 96;
         }
         window.scrollTo({
            top: offset,
            behavior: 'smooth',
         });
      }
   };

   return (
      <div
         className='mt-6 flex items-center justify-center'>
         <p
            className={`z-10 max-lg:text-[32px] ${className}`}
         >
            <button onClick={handleClick}>
               <CiCircleChevDown className='animate-bounce' />
            </button>
         </p>
      </div>
   )
}

export default ArrowButton;
