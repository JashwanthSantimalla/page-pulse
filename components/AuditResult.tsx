type AuditResultProps = {
  result: any;
};

export default function AuditResult({ result }: AuditResultProps) {
  if (!result) return null;

  const cards = [
    { label: "HTTP Status", value: result.status },
    { label: "Response Time", value: `${result.responseTime} ms` },
    { label: "Page Title", value: result.title },
    { label: "Meta Description", value: result.metaDescription },
    { label: "H1 Count", value: result.h1Count },
    { label: "Images Missing Alt", value: result.imagesMissingAlt },
    { label: "Approx. Word Count", value: result.wordCount },
  ];

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Audit Report</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.label}</p>

            <p className="mt-2 break-words text-lg font-semibold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}