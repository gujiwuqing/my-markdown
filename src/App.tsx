import React, { useState, useRef, useEffect } from "react";
import { Input, Row, Col, Select } from "antd";
import OnlyView from "./components/OnlyView";
import { getCursorPosition, setSelectionRange } from "./util/";
import ToolBar from "./components/ToolBar";
import { md2html } from "./myParser";
import juejinMarkdownThemes from "./util/theme";
import "./App.less";

const { TextArea } = Input;
const App = () => {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("");
  const inputRef = useRef(null);
  const handleChange = async (themes: string) => {
    console.log(themes);

    setTheme(themes);
  };

  // 加粗工具
  const addBlod = async () => {
    const el = inputRef?.current?.resizableTextArea?.textArea;
    let [start, end] = getCursorPosition(el);
    const symbol = "**";
    const txt = "加粗字体";
    let newValue =
      start === end
        ? value.slice(0, start) + `${symbol}${txt}${symbol}` + value.slice(end)
        : value.slice(0, start) +
          symbol +
          value.slice(start, end) +
          symbol +
          value.slice(end);

    let selectionStart = start + symbol.length;
    let selectionEnd =
      start === end ? end + symbol.length + txt.length : end + symbol.length;

    setSelectionRange(el, selectionStart, selectionEnd); // 选中加粗的文本
    setValue(newValue);
  };

  // useEffect(() => {
  //    let [selectionStart, selectionEnd] = getCursorPosition(editRef.current);
  // },[value])
  return (
    <div className="editor-area">
      <div className="editor-header">
        <ToolBar
          value={value}
          onChange={(value: string) => {
            setValue(value);
          }}
          editElement={inputRef}
        />
      </div>
      <Row className="editor-content">
        <Col span={12}>
          <TextArea
            className="m-textarea"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <OnlyView value={value} theme={theme} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
