export const pricingContent = {
  saveBadge: "Save 20%",
  ctaLabel: "Get started",
  ctaHref: "/#contact",
  billing: {
    monthly: {
      label: "billed monthly",
    },
    yearly: {
      label: "billed yearly",
      discount: 0.2,
    },
  },
  plans: [
    {
      id: "starter",
      name: "STARTER",
      priceMonthly: 49,
      popular: false,
      features: [
        "5 documents",
        "2,000 chats/month",
        "1 website embed",
        "WhatsApp handoff",
        "Email support",
      ],
    },
    {
      id: "growth",
      name: "GROWTH",
      priceMonthly: 499,
      popular: true,
      popularLabel: "Most popular",
      features: [
        "25 documents",
        "10,000 chats/month",
        "3 website embeds",
        "WhatsApp + email handoff",
        "Live dashboard + SLA",
        "Priority support",
      ],
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      priceMonthly: 4999,
      popular: false,
      features: [
        "5 documents",
        "2,000 chats/month",
        "1 website embed",
        "WhatsApp handoff",
        "Email support",
      ],
    },
  ],
};
