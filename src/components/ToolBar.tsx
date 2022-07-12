import React from "react";
import { Tooltip, Dropdown, Select, Menu } from "antd";
import { useTextSelection } from "ahooks";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import _virtual_juejinMarkdownThemes from "juejin-markdown-themes/dist/index.js";

export default function ToolBar({ value, onChange }) {
  const { text } = useTextSelection();
  const list = [
    {
      placeholder: "加粗",
      icon: <BoldOutlined />,
      type: "bold",
    },
    {
      placeholder: "斜体",
      icon: <ItalicOutlined />,
      type: "italic",
    },
    {
      placeholder: "删除线",
      icon: <StrikethroughOutlined />,
      type: "delete",
    },
    {
      placeholder: "",
      icon: <BgColorsOutlined />,
      type: "theme",
      list: _virtual_juejinMarkdownThemes,
    },
  ];
  const handleClick = (type: string) => {
    console.log("text", text);
    console.log(type);
  };
  const handleChange = () => {};

  interface IProps {
    string: {
      style: string;
      highlight: string;
    };
  }
  const menu = (list: IProps) => {
    return (
      <div className="theme-list">
        {Object.entries(list).map((item) => {
          return (
            <div key={item[1].style} className="theme-item">
              {item[0] || "测试"}
            </div>
          );
        })}
      </div>
    );
  };
  const RenderToolBar = (item) => {
    switch (item.type) {
      case "theme":
        return (
          <Dropdown
            overlay={() => {
              return menu(item?.list);
            }}
            placement="bottomLeft"
            arrow
          >
            {item.icon}
          </Dropdown>
        );
      default:
        return (
          <Tooltip title={item.placeholder}>
            <span
              onClick={() => {
                handleClick(item.type);
              }}
            >
              {item.icon}
            </span>
          </Tooltip>
        );
    }
  };
  return (
    <div className="toolbar">
      {list.map((item) => {
        return (
          <div key={item.type} className="toolbar-item">
            {RenderToolBar(item)}
          </div>
        );
      })}
    </div>
  );
}
