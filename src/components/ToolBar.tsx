import React from 'react';
import {Tooltip, Dropdown, Select, Menu} from 'antd';
import {changeValue} from '../util';
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import _virtual_juejinMarkdownThemes from 'juejin-markdown-themes/dist/index.js';

interface ToolBarProps {
  value: string;
  onChange: (value: string) => void;
  editElement: any;
}

export default function ToolBar({value, onChange, editElement}:ToolBarProps) {
  const ref = editElement?.current?.resizableTextArea?.textArea
  const list = [
    {
      placeholder: '粗体',
      icon: <BoldOutlined/>,
      type: 'bold',
      symbol:'**'
    },
    {
      placeholder: '斜体',
      icon: <ItalicOutlined/>,
      type: 'italic',
      symbol:'*'
    },
    {
      placeholder: '删除线',
      icon: <StrikethroughOutlined/>,
      type: 'delete',
      symbol:'~~'
    },
    {
      placeholder: '',
      icon: <BgColorsOutlined/>,
      type: 'theme',
      list: _virtual_juejinMarkdownThemes,
    },
  ];
  const handleClick = (item:any) => {
    let text=''
    if (ref){
      text= changeValue(ref,value,item.symbol,item.placeholder)
      onChange&&onChange(text)
    }else {
      onChange&&onChange('**默认文字**')
    }
  };
  const handleChange = () => {
  };

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
              {item[0] || '测试'}
            </div>
          );
        })}
      </div>
    );
  };
  const RenderToolBar = (item) => {
    switch (item.type) {
      case 'theme':
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
                handleClick(item);
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
