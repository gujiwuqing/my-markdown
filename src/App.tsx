import React, { useState, useRef, useEffect } from "react";
import { Input, Row, Col, Select } from "antd";
import OnlyView from "./components/OnlyView";
import { getCursorPosition, setSelectionRange } from "./util/";
import ToolBar from "./components/ToolBar";
import { md2html } from "./myParser";
import juejinMarkdownThemes from "./util/theme";
import { useTextSelection } from "ahooks";
import "./App.less";

const { TextArea } = Input;
const App = () => {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("");
  const inputRef = useRef(null);
  return (
    <div className="editor-area">
      <div className="editor-header">
        <ToolBar
          value={value}
          theme={theme}
          onChange={(value: string) => {
            setValue(value);
          }}
          onChangeTheme={(themes: string) => {
            setTheme(themes);
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
