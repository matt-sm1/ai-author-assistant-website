import { pricingContent } from "@/content/home/pricing";

const rows = [
  { label: "Documents", pattern: /documents/i },
  { label: "Chats per month", pattern: /chats\/month/i },
  { label: "Website embeds", pattern: /website embed/i },
  { label: "Handoff", pattern: /handoff/i },
  { label: "Dashboard and SLA", pattern: /dashboard/i },
  { label: "Support", pattern: /support/i },
];

export default function PricingComparison() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-display text-[32px] font-bold leading-tight text-heading sm:text-[40px] md:text-[48px]">
            Compare Our Plans
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-copy sm:text-base">
            {pricingContent.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-[1136px] overflow-x-auto rounded-[24px] bg-white p-5 sm:p-8">
          <table className="w-full min-w-[640px] table-fixed text-left">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th scope="col" className="py-4 pr-4 text-base font-semibold text-heading">Features</th>
                {pricingContent.plans.map((plan) => (
                  <th key={plan.id} scope="col" className="px-3 py-4 text-base font-semibold capitalize text-heading">
                    {plan.name.toLowerCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[var(--line)] last:border-b-0">
                  <th scope="row" className="py-5 pr-4 font-medium text-heading">{row.label}</th>
                  {pricingContent.plans.map((plan) => (
                    <td key={plan.id} className="px-3 py-5 text-sm text-copy">
                      {plan.features.find((feature) => row.pattern.test(feature)) || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-copy">— Not listed for this plan.</p>
        </div>
      </div>
    </section>
  );
}
