// app/components/GlobalLoadingIndicator.tsx
import { useNavigation } from "@remix-run/react";

export default function GlobalLoadingIndicator() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return isLoading ? (
    <div className="fixed top-0 left-0 w-full z-50 h-1 bg-primary animate-pulse" />
  ) : null;
}