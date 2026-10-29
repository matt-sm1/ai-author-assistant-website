"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/frontend/lib/utils";

/**
 * Accessible listbox styled like our Select trigger — without Radix Select.
 * Radix Select@2.4 always enables DismissableLayer disableOutsidePointerEvents,
 * which can leave document.body pointer-events:none after soft navigation.
 */
export default function ListboxSelect({
  id,
  label,
  placeholder = "Choose…",
  options = [],
  value = "",
  onChange,
  disabled = false,
  className,
}) {
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const listId = `${id}-listbox`;

  const selected = options.find((option) => String(option.value) === String(value));
  const enabledOptions = options.filter((option) => !option.disabled);

  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) close();
    }
    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  React.useEffect(() => {
    if (!open) return;
    const selectedEl = listRef.current?.querySelector('[aria-selected="true"]');
    selectedEl?.focus();
  }, [open]);

  function selectOption(option) {
    if (option.disabled) return;
    onChange?.(option.value);
    close();
  }

  function onTriggerKeyDown(event) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onOptionKeyDown(event, option, index) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(option);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = enabledOptions[Math.min(index + 1, enabledOptions.length - 1)];
      listRef.current
        ?.querySelector(`[data-value="${CSS.escape(String(next.value))}"]`)
        ?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = enabledOptions[Math.max(index - 1, 0)];
      listRef.current
        ?.querySelector(`[data-value="${CSS.escape(String(prev.value))}"]`)
        ?.focus();
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label ? (
        <label htmlFor={id} className="text-xs text-muted-foreground">
          {label}
        </label>
      ) : null}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((previous) => !previous)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "mt-1 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
          "ring-offset-background cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selected && "text-muted-foreground",
        )}
      >
        <span className="line-clamp-1 text-left">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          tabIndex={-1}
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);
            const enabledIndex = enabledOptions.findIndex(
              (item) => String(item.value) === String(option.value),
            );

            return (
              <li
                key={option.value}
                role="option"
                tabIndex={option.disabled ? -1 : 0}
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                data-value={option.value}
                onClick={() => selectOption(option)}
                onKeyDown={(event) =>
                  onOptionKeyDown(event, option, enabledIndex)
                }
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
                  "focus:bg-accent focus:text-accent-foreground",
                  option.disabled && "pointer-events-none opacity-50",
                  isSelected && "bg-accent/60",
                )}
              >
                <span className="line-clamp-1">{option.label}</span>
                {isSelected ? (
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
