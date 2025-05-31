import { Link } from "@remix-run/react";
import { Trash2 } from "lucide-react";

export default function TemplateTable({
  templates,
  onDelete,
}: {
  templates: TemplateI[];
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
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
          {templates.map((template) => {
            const totalPercentage =
              template.resource_estimates.engineering_percentage +
              template.resource_estimates.architecture_percentage +
              template.resource_estimates.sr_architecture_percentage;

            return (
              <tr key={template.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">{template.title}</td>
                <td className="px-4 py-4">
                  ${template.invoicing_details.initial_invoice_amount.toLocaleString()}
                </td>
                <td className="px-4 py-4">{totalPercentage}%</td>
                <td className="px-4 py-4 capitalize">{template.project_details.language}</td>
                <td className="px-4 py-4 flex items-center gap-4">
                  <Link
                    to={`/template/${template.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Use
                  </Link>
                  <button
                    onClick={() => onDelete?.(template.id)}
                    className="text-black hover:text-red-700 transition-colors"
                    title="Delete template"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}