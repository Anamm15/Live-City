import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        transition-opacity duration-300
        ${isOpen ? "opacity-100 bg-black/60" : "opacity-0 pointer-events-none"}
      `}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={`
          relative flex w-11/12 max-w-lg flex-col gap-4 rounded-lg bg-white p-2 md:p-6 shadow-xl transition-all duration-300 ease-out 
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          sm:w-full sm:p-8
        `}
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
          <h2 className="text-xl font-semibold text-gray-800 p-1">{title}</h2>
        )}

        <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}
