// components/Button.tsx
import { File } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
  className = "",
  loading = false,
  ...rest
}: ButtonProps) {
  const handleClick = () => {
    if (loading) return;
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 px-4 rounded transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {loading ? "Loading..." : children}
      <File className="w-4 h-4" />
    </button>
  );
}