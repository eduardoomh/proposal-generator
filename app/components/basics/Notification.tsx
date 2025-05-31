
type NotificationProps = {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
};

export default function Notification({ type, message, onClose }: NotificationProps) {
  const baseClasses =
    "fixed top-5 right-5 max-w-sm w-full rounded shadow-lg flex items-center space-x-4 px-4 py-3 text-white z-50";
  const typeClasses =
    type === "success"
      ? "bg-green-500"
      : "bg-red-600";

        return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <div className="flex-1">
        {type === "success" && (
          <svg
            className="w-6 h-6 text-white inline-block mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === "error" && (
          <svg
            className="w-6 h-6 text-white inline-block mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close notification"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}