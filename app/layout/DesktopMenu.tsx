import { Link } from "@remix-run/react";

export function DesktopLayout() {
    return (
        <header className="flex items-center justify-center px-4 py-2 bg-primary">
            <menu className="w-[1250px] flex items-center justify-start gap-8">
                <div className="mb-2">
                    <Link to="/" className="cursor-pointer">
                        <img src="/IP-Insight-Support-Logo.png" width="220" alt="IP-Insight-Support-Logo.webp" />
                    </Link>
                </div>
                <ul className="flex items-center justify-center gap-4 text-black">
                    <li>
                        <Link
                            to="/proposals"
                            className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary cursor-pointer"
                        >
                            Proposals
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/templates"
                            className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary cursor-pointer"
                        >
                            Templates
                        </Link>
                    </li>
                     <li>
                        <Link
                            to="/pdf-content"
                            className="font-medium text-sm p-2 rounded hover:bg-hoverPrimary cursor-pointer"
                        >
                            PDF Content
                        </Link>
                    </li>
                </ul>
            </menu>

        </header>
    )
}