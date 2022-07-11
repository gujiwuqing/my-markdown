import React from 'react'

export default function OnlyView({ value }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      id="markdown"
      className="markdown-body"
    />
  );
}
