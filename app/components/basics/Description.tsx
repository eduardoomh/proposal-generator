import { PropsWithChildren } from "react";

export default function Description(props: PropsWithChildren) {
  const { children } = props;

  return (
     <p className="text-sm text-gray-600">
        {children}
     </p>
  );
}