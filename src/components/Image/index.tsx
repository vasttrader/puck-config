import type { ComponentConfig } from "@measured/puck";

export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  alignment?: "left" | "center" | "right";
  caption?: string;
  link?: string;
  openInNewTab?: boolean;
  borderRadius?: number;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  aspectRatio?: "16:9" | "4:3" | "1:1" | "21:9" | "custom" | "none";
  customAspectRatio?: string;
  maxWidth?: number;
  loading?: "lazy" | "eager";
};

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const aspectRatioValues = {
  "16:9": "16 / 9",
  "4:3": "4 / 3",
  "1:1": "1 / 1",
  "21:9": "21 / 9",
  custom: undefined,
  none: undefined,
};

export const Image: ComponentConfig<ImageProps> = {
  label: "Image",
  fields: {
    src: {
      type: "text",
      label: "Image URL",
    },
    alt: {
      type: "text",
      label: "Alt Text (for accessibility)",
    },
    width: {
      type: "number",
      label: "Width (px)",
      min: 1,
      max: 4000,
    },
    height: {
      type: "number",
      label: "Height (px)",
      min: 1,
      max: 4000,
    },
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      options: [
        { label: "None", value: "none" },
        { label: "16:9 (Widescreen)", value: "16:9" },
        { label: "4:3 (Standard)", value: "4:3" },
        { label: "1:1 (Square)", value: "1:1" },
        { label: "21:9 (Ultrawide)", value: "21:9" },
        { label: "Custom", value: "custom" },
      ],
    },
    customAspectRatio: {
      type: "text",
      label: "Custom Aspect Ratio (e.g., 3/2)",
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
        { label: "Scale Down", value: "scale-down" },
      ],
    },
    objectPosition: {
      type: "text",
      label: "Object Position (e.g., center, top, bottom)",
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    maxWidth: {
      type: "number",
      label: "Max Width (px, 0 = no limit)",
      min: 0,
      max: 2000,
    },
    caption: {
      type: "textarea",
      label: "Caption (optional)",
    },
    link: {
      type: "text",
      label: "Link URL (optional)",
    },
    openInNewTab: {
      type: "radio",
      label: "Open Link in New Tab",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderRadius: {
      type: "number",
      label: "Border Radius (px)",
      min: 0,
      max: 100,
    },
    shadow: {
      type: "select",
      label: "Shadow",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    loading: {
      type: "radio",
      label: "Loading Strategy",
      options: [
        { label: "Lazy", value: "lazy" },
        { label: "Eager", value: "eager" },
      ],
    },
  },
  defaultProps: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    alt: "Beautiful landscape",
    width: 800,
    height: 600,
    objectFit: "cover",
    objectPosition: "center",
    alignment: "center",
    caption: "",
    link: "",
    openInNewTab: true,
    borderRadius: 0,
    shadow: "none",
    aspectRatio: "none",
    customAspectRatio: "",
    maxWidth: 0,
    loading: "lazy",
  },
  render: (props) => {
    const {
      src,
      alt,
      width = 800,
      height = 600,
      objectFit = "cover",
      objectPosition = "center",
      alignment = "center",
      caption,
      link,
      openInNewTab = true,
      borderRadius = 0,
      shadow = "none",
      aspectRatio = "none",
      customAspectRatio,
      maxWidth,
      loading = "lazy",
    } = props;

    const aspectValue =
      aspectRatio === "custom" && customAspectRatio
        ? customAspectRatio
        : aspectRatioValues[aspectRatio];

    const alignmentStyles: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    const imageElement = (
      <div
        className="external-image-wrapper"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: maxWidth ? `${maxWidth}px` : "100%",
          aspectRatio: aspectValue,
          borderRadius: `${borderRadius}px`,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            display: "block",
            objectFit,
            objectPosition,
            width: "100%",
            height: "100%",
          }}
          loading={loading}
          className={shadowClasses[shadow]}
        />
      </div>
    );

    const content = (
      <figure
        className="external-image-container"
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: alignmentStyles[alignment],
          width: "100%",
        }}
      >
        {link ? (
          <a
            href={link}
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            style={{
              display: "block",
              width: "100%",
              maxWidth: maxWidth ? `${maxWidth}px` : "100%",
            }}
          >
            {imageElement}
          </a>
        ) : (
          imageElement
        )}
        {caption && (
          <figcaption
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#6b7280",
              textAlign: alignment,
              maxWidth: maxWidth ? `${maxWidth}px` : "100%",
              width: "100%",
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    );

    return content;
  },
};
