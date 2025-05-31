interface FormContentProps {
  children: React.ReactNode;
  singleColumn?: boolean;
}

export default function FormContent({ children, singleColumn = false }: FormContentProps) {
  const columnClasses = singleColumn
    ? "grid-cols-1"
    : "grid-cols-1 md:grid-cols-2";

  return (
    <section className={`grid ${columnClasses} gap-4 mt-6 mb-6`}>
      {children}
    </section>
  );
}