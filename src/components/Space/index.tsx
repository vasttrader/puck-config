import type { ComponentConfig } from "@measured/puck";

export type SpaceProps = {
  height?: number;
  width?: number;
  mobileHeight?: number;
  mobileWidth?: number;
  backgroundColor?: string;
  showDivider?: boolean;
  dividerColor?: string;
  dividerStyle?: "solid" | "dashed" | "dotted";
  dividerThickness?: number;
};

export const Space = {
  label: "Space",
  fields: {
    height: {
      type: "number",
      label: "Height (Desktop)",
      min: 0,
      max: 500,
    },
    mobileHeight: {
      type: "number",
      label: "Height (Mobile)",
      min: 0,
      max: 300,
    },
    width: {
      type: "number",
      label: "Width (0 = full width)",
      min: 0,
      max: 2000,
    },
    mobileWidth: {
      type: "number",
      label: "Width Mobile (0 = full width)",
      min: 0,
      max: 1000,
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    showDivider: {
      type: "radio",
      label: "Show Divider Line",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    dividerColor: {
      type: "text",
      label: "Divider Color",
    },
    dividerStyle: {
      type: "select",
      label: "Divider Style",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Dashed", value: "dashed" },
        { label: "Dotted", value: "dotted" },
      ],
    },
    dividerThickness: {
      type: "number",
      label: "Divider Thickness (px)",
      min: 1,
      max: 10,
    },
  },
  defaultProps: {
    height: 40,
    width: 0,
    mobileHeight: 20,
    mobileWidth: 0,
    backgroundColor: "transparent",
    showDivider: false,
    dividerColor: "#e5e7eb",
    dividerStyle: "solid",
    dividerThickness: 1,
  },
  render: ({
    height = 40,
    width = 0,
    mobileHeight = 20,
    mobileWidth = 0,
    backgroundColor = "transparent",
    showDivider = false,
    dividerColor = "#e5e7eb",
    dividerStyle = "solid",
    dividerThickness = 1,
  }) => {
    const dividerStyles = showDivider
      ? {
          borderTop: `${dividerThickness}px ${dividerStyle} ${dividerColor}`,
        }
      : {};

    return (
      <>
        <div
          className="puck-space"
          style={{
            height: `${height}px`,
            width: width ? `${width}px` : "100%",
            backgroundColor,
            ...dividerStyles,
          }}
          aria-hidden="true"
        />
        <style>{`
        @media (max-width: 768px) {
          .puck-space {
            height: ${mobileHeight}px !important;
            width: ${mobileWidth ? `${mobileWidth}px` : "100%"} !important;
          }
        }
      `}</style>
      </>
    );
  },
} satisfies ComponentConfig<SpaceProps>;
