import React from "react";

interface TypographyProps {
  variant?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  tag?: "h1" | "div" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  children: React.ReactNode;
  className?: string;
  color?: string;
  align?: "left" | "center" | "right";
  size?: number;
}

export default function Typography({
  variant = "medium",
  tag = "div",
  children,
  className = "",
  weight,
  color = "text-black",
  align = "left",
  size,
}: TypographyProps) {
  const style: React.CSSProperties = {
    // letterSpacing: "0.5px",
  };
  const Tag = tag;

  if (variant === "large") {
    style.fontSize = "16px";
    style.fontWeight = "500";
  } else if (variant === "medium") {
    style.fontSize = "13px";
    style.fontWeight = "500";
  } else if (variant === "xsmall") {
    style.fontSize = "10px";
    style.fontWeight = "400";
  }

  if (weight) {
    style.fontWeight = weight;
  }
  if (size) {
    style.fontSize = `${size}px`;
  }
  return (
    <Tag
      className={`${align === "center" ? "text-center" : ""} ${
        align === "right" ? "text-right" : ""
      }${className}`}
      style={{
        color,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
