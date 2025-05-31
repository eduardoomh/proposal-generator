import { useState } from "react";
import { Link } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import Notification from "../basics/Notification"; // Asegúrate de que la ruta sea correcta

type Proposal = {
  prepared_by: string;
  company_information: {
    company_name: string;
    email_address: string;
  };
  estimates: {
    estimated_cost: number;
  };
  id: string;
};

export default function ProposalTable({
  proposals,
  onDelete,
}: {
  proposals: Proposal[];
  onDelete?: (id: string) => void;
}) {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete proposal");
      }

      setNotification({
        type: "success",
        message: "Proposal deleted successfully",
      });

      onDelete?.(id);
    } catch (err) {
      setNotification({
        type: "error",
        message: "An error occurred while deleting",
      });
    }
  };

  return (
    <div className="overflow-x-auto relative">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Estimated cost</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {proposals.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No proposals found.
              </td>
            </tr>
          ) : (
            proposals.map((proposal) => (
              <tr key={proposal.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">{proposal.prepared_by}</td>
                <td className="px-4 py-4">
                  {proposal.company_information.company_name}
                </td>
                <td className="px-4 py-4">
                  {proposal.company_information.email_address}
                </td>
                <td className="px-4 py-4">
                  ${proposal.estimates.estimated_cost.toLocaleString()}
                </td>
                <td className="px-4 py-4 flex items-center gap-4">
                  <Link
                    to={`/proposal/${proposal.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Use
                  </Link>
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    className="text-black hover:text-red-700 transition-colors"
                    title="Delete proposal"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}