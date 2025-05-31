import { useState } from "react";
import { Link } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import { getLanguageLabel } from "~/utils/General";
import Notification from "../basics/Notification";

export default function PDFContentTable({
  contents,
  onDelete,
}: {
  contents: PDFContentI[];
  onDelete?: (id: string) => void;
}) {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/pdf-content/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete content");
      }

      setNotification({
        type: "success",
        message: "PDF content deleted successfully",
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
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Language</th>
            <th className="px-4 py-3 text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          {contents.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                No PDF content found.
              </td>
            </tr>
          ) : (
            contents.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4 capitalize">{item.title}</td>
                <td className="px-4 py-4 capitalize">{getLanguageLabel(item.language)}</td>
                <td className="px-4 py-4 flex items-center gap-4">
                  <Link
                    to={`/pdf/edit/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-black hover:text-red-700 transition-colors"
                    title="Delete content"
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