// 获取光标位置
export function getCursorPosition(el: HTMLTextAreaElement) {
  let { selectionStart, selectionEnd } = el;

  return [selectionStart, selectionEnd];
}


// 设置光标位置
export function setSelectionRange(el: HTMLTextAreaElement, selectionStart: number, selectionEnd: number, isFocus: boolean = true) {
    let timer = setTimeout(() => {
        if(isFocus) {
            let { scrollTop } = el
            el.focus();
            el.scrollTop = scrollTop   // 保持聚焦后页面不滚动到底部
        }
        el.setSelectionRange(selectionStart, selectionEnd)   // 光标选中指定的文本
        clearTimeout(timer)
    }, 0)
}