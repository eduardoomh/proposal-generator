interface MainContainerProps {
    children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="flex justify-center w-full">
      <main className="w-full max-w-[1250px] mt-12 mb-24 px-3 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}