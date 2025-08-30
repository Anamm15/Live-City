import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className="relative flex w-11/12 max-w-lg flex-col gap-4 rounded-lg bg-white p-6 shadow-xl transition-all duration-300 sm:w-full sm:p-8"
        tabIndex={-1} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1 text-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Tutup modal"
        >
          <IoClose />
        </button>
        
        {title && (
          <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        )}
        
        <div className="max-h-[70vh] overflow-y-auto pr-2">
            {children}
        </div>
      </div>
    </div>
  );
}