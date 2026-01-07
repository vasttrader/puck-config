import type { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenFirst?: boolean;
  variant?: "default" | "bordered" | "separated" | "minimal";
  iconPosition?: "left" | "right";
  icon?: "chevron" | "plus" | "arrow";
  animationDuration?: number;
  className?: string;
};

export const Accordion: ComponentConfig<AccordionProps> = {
  label: "Accordion",
  fields: {
    items: {
      type: "array",
      label: "Accordion Items",
      arrayFields: {
        id: {
          type: "text",
          label: "ID (unique identifier)",
        },
        title: {
          type: "text",
          label: "Title",
        },
        content: {
          type: "textarea",
          label: "Content (supports HTML)",
        },
      },
      defaultItemProps: {
        id: "",
        title: "New Item",
        content: "<p>Enter content here...</p>",
      },
      getItemSummary: (item) => item.title || "Untitled",
    },
    allowMultiple: {
      type: "radio",
      label: "Allow Multiple Open",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    defaultOpenFirst: {
      type: "radio",
      label: "Open First Item by Default",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    variant: {
      type: "select",
      label: "Style Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Bordered", value: "bordered" },
        { label: "Separated", value: "separated" },
        { label: "Minimal", value: "minimal" },
      ],
    },
    iconPosition: {
      type: "radio",
      label: "Icon Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    icon: {
      type: "select",
      label: "Icon Type",
      options: [
        { label: "Chevron", value: "chevron" },
        { label: "Plus/Minus", value: "plus" },
        { label: "Arrow", value: "arrow" },
      ],
    },
    animationDuration: {
      type: "number",
      label: "Animation Duration (ms)",
      min: 0,
      max: 1000,
    },
    className: {
      type: "text",
      label: "Custom CSS Class",
    },
  },
  defaultProps: {
    items: [
      {
        id: "item-1",
        title: "What is this accordion?",
        content:
          "<p>This is a flexible accordion component that can be customized to fit your needs. You can add multiple items, customize the styling, and control the behavior.</p>",
      },
    ],
    allowMultiple: false,
    defaultOpenFirst: true,
    variant: "default",
    iconPosition: "right",
    icon: "chevron",
    animationDuration: 300,
    className: "",
  },
  render: ({
    items,
    allowMultiple = false,
    defaultOpenFirst = false,
    variant = "default",
    iconPosition = "right",
    icon = "chevron",
    animationDuration = 300,
    className = "",
  }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(() => {
      if (defaultOpenFirst && items.length > 0) {
        return new Set([items[0].id]);
      }
      return new Set();
    });

    const toggleItem = (id: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(id);
        }
        return newSet;
      });
    };

    const getIcon = (isOpen: boolean) => {
      switch (icon) {
        case "chevron":
          return (
            <svg
              className={`puck-accordion-icon ${isOpen ? "puck-accordion-icon-open" : ""}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Toggle accordion"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        case "plus":
          return (
            <svg
              className={`puck-accordion-icon ${isOpen ? "puck-accordion-icon-open" : ""}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Toggle accordion"
            >
              {isOpen ? (
                <path d="M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          );
        case "arrow":
          return (
            <svg
              className={`puck-accordion-icon ${isOpen ? "puck-accordion-icon-open" : ""}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Toggle accordion"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
      }
    };

    return (
      <>
        <div className={`puck-accordion puck-accordion-${variant} ${className}`}>
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`puck-accordion-item ${isOpen ? "puck-accordion-item-open" : ""}`}
              >
                <button
                  className={`puck-accordion-trigger ${iconPosition === "left" ? "puck-accordion-trigger-icon-left" : ""}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  {iconPosition === "left" && (
                    <span className="puck-accordion-icon-wrapper">{getIcon(isOpen)}</span>
                  )}
                  <span className="puck-accordion-title">{item.title}</span>
                  {iconPosition === "right" && (
                    <span className="puck-accordion-icon-wrapper">{getIcon(isOpen)}</span>
                  )}
                </button>
                <div
                  className={`puck-accordion-content ${isOpen ? "puck-accordion-content-open" : ""}`}
                  style={{
                    maxHeight: isOpen ? "1000px" : "0",
                    transition: `max-height ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`,
                  }}
                >
                  <div className="puck-accordion-content-inner">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
        .puck-accordion {
          width: 100%;
        }

        .puck-accordion-default {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .puck-accordion-default .puck-accordion-item:not(:last-child) {
          border-bottom: 1px solid #e5e7eb;
        }

        .puck-accordion-bordered .puck-accordion-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 8px;
          overflow: hidden;
        }

        .puck-accordion-bordered .puck-accordion-item:last-child {
          margin-bottom: 0;
        }

        .puck-accordion-separated .puck-accordion-item {
          border-radius: 8px;
          margin-bottom: 12px;
          padding: 4px;
        }

        .puck-accordion-separated .puck-accordion-item:last-child {
          margin-bottom: 0;
        }

        .puck-accordion-minimal .puck-accordion-item:not(:last-child) {
          border-bottom: 1px solid #f3f4f6;
          padding: 8px 0;
        }

        .puck-accordion-trigger {
          background-color: transparent;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .puck-accordion-trigger-icon-left {
          flex-direction: row-reverse;
        }

        .puck-accordion-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          flex: 1;
        }

        .puck-accordion-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          color: #6b7280;
        }

        .puck-accordion-trigger-icon-left .puck-accordion-icon-wrapper {
          margin-left: 0;
          margin-right: 12px;
        }

        .puck-accordion-icon {
          transition: transform ${animationDuration}ms ease;
        }

        .puck-accordion-icon-open {
          transform: rotate(180deg);
        }

        .puck-accordion-trigger-icon-left .puck-accordion-icon-open {
          transform: rotate(90deg);
        }

        .puck-accordion-content {
          overflow: hidden;
          opacity: 0;
        }

        .puck-accordion-content-open {
          opacity: 1;
          border-top: 1px solid #e4e4e4;
        }

        .puck-accordion-content-inner {
          padding: 0 20px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
      </>
    );
  },
};
