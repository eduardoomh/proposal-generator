export default function SkeletonPDFContent() {
  return (
    <div className="overflow-x-auto relative animate-pulse">
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Language</th>
            <th className="px-4 py-3 text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}