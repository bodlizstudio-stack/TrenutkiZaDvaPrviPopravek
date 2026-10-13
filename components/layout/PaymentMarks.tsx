const marks = [
  { name: "Visa", node: <WordMark label="VISA" /> },
  { name: "Mastercard", node: <MastercardMark /> },
  { name: "American Express", node: <WordMark label="AMEX" /> },
  { name: "PayPal", node: <WordMark label="PayPal" /> },
];

export function PaymentMarks() {
  return (
    <ul className="flex flex-wrap items-center gap-2 text-ivory/80" aria-label="Sprejeta plačila">
      {marks.map((mark) => (
        <li key={mark.name}>
          <span
            title={mark.name}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-current px-2.5"
          >
            <span className="sr-only">{mark.name}</span>
            {mark.node}
          </span>
        </li>
      ))}
    </ul>
  );
}

function WordMark({ label }: { label: string }) {
  return <span className="text-[11px] font-semibold tracking-wide">{label}</span>;
}

function MastercardMark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 28 16" className="h-3.5 w-6" aria-hidden fill="none">
        <circle cx="10" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="text-[11px] font-semibold tracking-wide">Mastercard</span>
    </span>
  );
}
