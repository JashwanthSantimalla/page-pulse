type AuditResultProps = {
  result: any;
};

const CARD_CONFIG = [
  {
    key: "status",
    label: "HTTP Status",
    icon: "🛡️",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    key: "responseTime",
    label: "Response Time",
    icon: "⚡",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    suffix: " ms",
  },
  {
    key: "title",
    label: "Page Title",
    icon: "📄",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    key: "metaDescription",
    label: "Meta Description",
    icon: "🏷️",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    key: "h1Count",
    label: "H1 Count",
    icon: "🇭",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    key: "imagesMissingAlt",
    label: "Images Missing Alt",
    icon: "🖼️",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    key: "wordCount",
    label: "Approx. Word Count",
    icon: "📝",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

export default function AuditResult({ result }: AuditResultProps) {
  if (!result) return null;

  return (
    <div
      className="
        w-full
        rounded-[28px]
        border
        border-violet-500/20
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-[0_0_60px_rgba(99,102,241,.08)]
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="text-violet-400">📊</span>
          Audit Report
        </h2>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
          ● Checks
        </span>
      </div>

      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARD_CONFIG.map((card) => {
          const rawValue = result[card.key];

          const value =
            rawValue === undefined ||
            rawValue === null ||
            rawValue === ""
              ? "—"
              : `${rawValue}${card.suffix || ""}`;

          const isMeta = card.key === "metaDescription";
          const isTitle = card.key === "title";

          return (
            <div
              key={card.key}
              className={`
                flex flex-col
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                p-4
                transition
                hover:border-violet-500/30
                ${isMeta ? "row-span-2" : ""}
              `}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${card.bg}
                    ${card.color}
                  `}
                >
                  {card.icon}
                </span>

                <p className="text-sm text-gray-400">
                  {card.label}
                </p>
              </div>

              {isMeta ? (
                <p
                  className={`
                    text-base
                    leading-8
                    break-words
                    ${card.color}
                  `}
                >
                  {value}
                </p>
              ) : isTitle ? (
                <p
                  title={String(value)}
                  className={`
                    mt-auto
                    truncate
                    text-center
                    text-xl
                    font-bold
                    ${card.color}
                  `}
                >
                  {value}
                </p>
              ) : (
                <p
                  className={`
                    mt-auto
                    text-center
                    text-2xl
                    font-bold
                    ${card.color}
                  `}
                >
                  {value}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}