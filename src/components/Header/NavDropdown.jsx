"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export default function NavDropdown({ label, items, isActive, onNavigate }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const active = items.some((item) => isActive(item.href));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        className={`relative inline-flex cursor-pointer items-center gap-1 rounded-md px-1 py-2 font-sans text-[13px] font-medium transition-[color,opacity] duration-200 hover:text-accent md:text-[16px] ${
          active ? "text-accent" : "text-heading"
        }`}
      >
        {label}
        <FiChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="fixed inset-x-0 top-24 z-50 border-t border-heading/10 bg-white shadow-xl"
        >
          <ul className="mx-auto flex max-w-[1200px] items-stretch gap-2 px-4 py-2 sm:px-6">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href} className="flex min-w-0 flex-1">
                  <Link
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className={`flex w-full flex-col items-center gap-1.5 rounded-lg px-2 py-1.5 text-center font-sans text-[12px] font-medium leading-tight no-underline transition-colors hover:bg-accent/5 ${
                      isActive(item.href) ? "text-accent" : "text-heading"
                    }`}
                  >
                    {Icon && (
                      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                        <Icon aria-hidden="true" className="size-3.5" />
                      </span>
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
