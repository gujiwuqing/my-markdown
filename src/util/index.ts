// 获取光标位置
export function getCursorPosition(el: HTMLTextAreaElement) {
  let { selectionStart, selectionEnd } = el;
  return [selectionStart, selectionEnd];
}

// 设置光标位置
export function setSelectionRange(
  el: HTMLTextAreaElement,
  selectionStart: number,
  selectionEnd: number,
  isFocus: boolean = true
) {
  let timer = setTimeout(() => {
    if (isFocus) {
      let { scrollTop } = el;
      el.focus();
      el.scrollTop = scrollTop; // 保持聚焦后页面不滚动到底部
    }
    el.setSelectionRange(selectionStart, selectionEnd); // 光标选中指定的文本
    clearTimeout(timer);
  }, 0);
}

export function changeValue(
  el: HTMLElement,
  value: string,
  symbol: string,
  txt: string
): string {
  let [start, end] = getCursorPosition(<HTMLTextAreaElement>el);
  return start === end
    ? value.slice(0, start) + `${symbol}${txt}${symbol}` + value.slice(end)
    : value.slice(0, start) +
        symbol +
        value.slice(start, end) +
        symbol +
        value.slice(end);
}

export function setTitle(
  el: HTMLElement,
  value: string,
  symbol: string,
  txt: string
): string {
  let [start, end] = getCursorPosition(<HTMLTextAreaElement>el);
  console.log("start", start, "end", end);
  return start === end
    ? value.slice(0, start) + `${symbol}${txt}`
    : value.slice(0, start) + symbol + value.slice(start, end);
}

// 添加代码块
export function addCodeBlock(
  el: HTMLTextAreaElement,
  value: string,
  symbol: string
) {
  let [start, end] = getCursorPosition(el);

  let newValue =
    start === end
      ? `${value.slice(0, start)}\n\`\`\`\n\n\`\`\`\n${value.slice(end)}`
      : `${value.slice(0, start)}\n\`\`\`\n${value.slice(
          start,
          end
        )}\n\`\`\`\n${value.slice(end)}`;

  let selectionStart = end + 5;
  let selectionEnd = end + 5;

  setSelectionRange(el, selectionStart, selectionEnd);
  return newValue;
}
