import type { SharedMaterial } from '../../models/question';

interface MaterialDisplayProps {
  material: SharedMaterial;
}

export function MaterialDisplay({ material }: MaterialDisplayProps) {
  if (material.type === 'text') {
    return (
      <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
          {material.content}
        </p>
      </div>
    );
  }

  if (material.type === 'table') {
    // Simple markdown table rendering
    const lines = material.content.trim().split('\n');
    const tableLines = lines.filter((l) => l.startsWith('|'));
    const headerLine = tableLines[0];
    const separatorLine = tableLines[1];
    const dataLines = tableLines.slice(2);

    const headers = headerLine.split('|').filter(Boolean).map((h) => h.trim());
    const rows = dataLines.map((line) =>
      line.split('|').filter(Boolean).map((c) => c.trim())
    );

    return (
      <div className="mb-4 overflow-x-auto -mx-1">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-blue-50">
              {headers.map((h, i) => (
                <th key={i} className="px-2 py-2 text-left font-semibold text-gray-700 border-b border-blue-100 first:pl-3 last:pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                {row.map((cell, j) => (
                  <td key={j} className="px-2 py-1.5 text-gray-600 border-b border-gray-100 first:pl-3 last:pr-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <p className="text-sm text-gray-500 italic">[图表材料]</p>
      <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap mt-2">
        {material.content}
      </p>
    </div>
  );
}
