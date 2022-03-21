// mdParser.ts
import { marked } from "marked";

export async function md2html(mdStr: string) {
  let html = await marked.parse(mdStr)
  return html;
}
