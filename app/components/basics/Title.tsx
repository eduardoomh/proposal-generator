import { PropsWithChildren } from "react";

export default function Title(props: PropsWithChildren) {
  const { children } = props;

  return (
    <h2 className="uppercase text-l font-semibold text-black-600">
      {children}
    </h2>
  );
}