import { useState } from "react";
import { Link } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import { getLanguageLabel } from "~/utils/General";
import Notification from "../basics/Notification";

export default function TemplateTable({
  templates,
  onDelete,
}: {
  templates: TemplateI[];
  onDelete?: (id: string) => void;
}) {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error("Failed to delete template");
      }

      setNotification({
        type: "success",
        message: "Template deleted successfully",
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
            <th className="px-4 py-3 text-left">Template</th>
            <th className="px-4 py-3 text-left">Initial Invoice</th>
            <th className="px-4 py-3 text-left">Percentage</th>
            <th className="px-4 py-3 text-left">Language</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No templates found.
              </td>
            </tr>
          ) : (
            templates.map((template) => {
              return (
                <tr key={template.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-4">{template.title}</td>
                  <td className="px-4 py-4">
                    ${template.invoicing_details.initial_invoice_amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    {template.resource_estimates.engineering_percentage} / {template.resource_estimates.architecture_percentage} / {template.resource_estimates.sr_architecture_percentage}
                  </td>
                  <td className="px-4 py-4 capitalize">
                    {getLanguageLabel(template.project_details.language)}
                  </td>
                  <td className="px-4 py-4">
                    <p className="flex gap-4">
                      <Link
                        to={`/template/${template.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Use
                      </Link>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-black hover:text-red-700 transition-colors"
                        title="Delete template"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </p>

                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}