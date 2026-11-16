"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export default function MobileNavGroup({ label, items, isActive, onNavigate }) {
  const [open, setOpen] = useState(false);
  const groupId = useId();

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={groupId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-base font-medium text-heading transition-colors hover:bg-accent/5 active:bg-accent/5"
      >
        {label}
        <FiChevronDown
          aria-hidden="true"
          className={`size-4 text-heading/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul id={groupId} className="ml-3 flex flex-col border-l border-heading/10 pl-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center rounded-lg px-3 py-3 text-[15px] font-medium no-underline transition-colors active:bg-accent/5 ${
                  isActive(item.href)
                    ? "bg-accent/5 text-accent"
                    : "text-heading hover:bg-accent/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
