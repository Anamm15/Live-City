type SpinnerLoadingProps = {
  className?: string;
};

export default function SpinnerLoading({ className }: SpinnerLoadingProps) {
  return (
    <div className="flex items-center gap-3 text-blue-600 mt-2.5">
      <svg
        className="animate-spin h-4 w-4 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>

      <p className={`text-sm font-medium ${className}`}>
        Processing your request
        <span className="animate-pulse">...</span>
      </p>
    </div>
  );
}
