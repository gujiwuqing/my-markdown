import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
export interface OnlyViewProps {
  value: string;
  theme: string;
}

export default function OnlyView({ value = "", theme = "" }: OnlyViewProps) {
  const html = marked.parse(value, {
    gfm: true,
    // highlight: function (code) {
    //   return hljs.highlightAuto(code).value;
    // },
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: theme ? `<style>${theme}</style>` + html : "" + html,
      }}
      id="markdown"
      className="markdown-body"
    />
  );
}
