// app/components/StaticContentTable.tsx
import { Link } from "@remix-run/react";

export default function PDFContentTable({
  contents,
}: {
  contents: PDFContentI[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Language</th>
            <th className="px-4 py-3 text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-4 capitalize">{item.title}</td>
              <td className="px-4 py-4 capitalize">{item.language}</td>
              <td className="px-4 py-4">
                <Link
                  to={`/pdf/edit/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}