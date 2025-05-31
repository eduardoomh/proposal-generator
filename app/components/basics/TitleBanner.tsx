import type { ReactNode } from "react";
import { useNavigate } from "@remix-run/react";
import { Plus } from "lucide-react";

type TitleBannerProps = {
  children: ReactNode;
  showButton?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
};

export default function TitleBanner({
  children,
  showButton = false,
  buttonLabel = "Click",
  buttonUrl = "/",
}: TitleBannerProps) {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center p-6 bg-secondary border-b border-gray-300">
      <div className="w-[1250px] px-2 flex justify-between items-center min-h-[44px]">
        <h1 className="text-2xl font-bold">{children}</h1>
        <div className="min-w-[120px] flex justify-end">
          {showButton && (
            <button
              onClick={() => navigate(buttonUrl)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}