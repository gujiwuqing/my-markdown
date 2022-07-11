import React from 'react';
import {marked} from 'marked';

export interface OnlyViewProps {
  value: string;
}

export default function OnlyView({value = ''}: OnlyViewProps) {
  return (
    <div
      dangerouslySetInnerHTML={{__html: marked.parse(value)}}
      id="markdown"
      className="markdown-body"
    />
  );
}
