import { useState } from "react";
import { Trash2 } from "lucide-react";
import Notification from "../basics/Notification";

export default function SellersTable({
  sellers,
  onDelete,
}: {
  sellers: string[];
  onDelete: (seller: string) => void;
}) {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDelete = (seller: string) => {
    try {
      onDelete(seller);
    } catch (err) {
      setNotification({
        type: "error",
        message: "Hubo un error al eliminar el seller",
      });
    }
  };

  return (
    <div className="overflow-x-auto relative mt-4">
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
            <th className="px-4 py-3 text-right">Options</th>
          </tr>
        </thead>
        <tbody>
          {sellers.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                No sellers registered.
              </td>
            </tr>
          ) : (
            sellers.map((seller) => (
              <tr key={seller} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">{seller}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(seller)}
                      className="text-black hover:text-red-700 transition-colors"
                      title="Eliminar seller"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}