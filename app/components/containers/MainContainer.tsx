interface MainContainerProps {
    children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
    return (
        <div className="flex justify-center">
            <main className="w-[1250px] mt-12 mb-24 px-3">
                {children}
            </main>
        </div>
    );
}