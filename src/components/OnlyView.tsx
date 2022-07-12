import React from "react";
import { marked } from "marked";

export interface OnlyViewProps {
  value: string;
  theme: string;
}

export default function OnlyView({ value = "", theme = "" }: OnlyViewProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: theme ? `<style>${theme}</style>` : "" + marked.parse(value),
      }}
      id="markdown"
      className="markdown-body"
    />
  );
}
