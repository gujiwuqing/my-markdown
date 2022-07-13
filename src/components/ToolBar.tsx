import React from 'react';
import {Tooltip, Dropdown} from 'antd';
import {changeValue, setTitle} from '../util';
import Icon, {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  TableOutlined
} from '@ant-design/icons';
import {CodeSvg} from './Icon';
import _virtual_juejinMarkdownThemes from 'juejin-markdown-themes/dist/index.js';

interface ToolBarProps {
  theme: string;
  value: string;
  onChange: (value: string) => void;
  onChangeTheme: (theme: string) => void;
  editElement: any;
}

export default function ToolBar({
                                  theme,
                                  value,
                                  onChange,
                                  editElement,
                                  onChangeTheme,
                                }: ToolBarProps) {
  const ref = editElement?.current?.resizableTextArea?.textArea;
  const list = [
    {
      placeholder: '粗体',
      icon: <BoldOutlined/>,
      type: 'bold',
      symbol: '**',
    },
    {
      placeholder: '斜体',
      icon: <ItalicOutlined/>,
      type: 'italic',
      symbol: '*',
    },
    {
      placeholder: '删除线',
      icon: <StrikethroughOutlined/>,
      type: 'delete',
      symbol: '~~',
    },
    {
      placeholder: '',
      icon: <FontSizeOutlined/>,
      type: 'title',
      list: [
        {
          label: 'H1 一级标题',
          value: '# ',
        },
        {
          label: 'H2 二级标题',
          value: '## ',
        },
        {
          label: 'H3 三级标题',
          value: '### ',
        },
        {
          label: 'H4 四级标题',
          value: '#### ',
        },
        {
          label: 'H5 五级标题',
          value: '##### ',
        },
        {
          label: 'H6 六级标题',
          value: '###### ',
        },
      ],
    },
    {
      placeholder: '代码',
      icon: <Icon component={CodeSvg}/>,
      type: 'code',
      symbol: '`',
    },{
      placeholder: '表格',
      icon: <TableOutlined/>,
      type: 'table',
    },
    {
      placeholder: '',
      icon: <BgColorsOutlined/>,
      type: 'theme',
      list: _virtual_juejinMarkdownThemes,
    },
  ];
  const handleClick = (item: any) => {
    let inputValue = '';
    if (ref) {
      inputValue = changeValue(ref, value, item.symbol, item.placeholder);
      onChange && onChange(inputValue);
    } else {
      onChange && onChange('**默认文字**');
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
            <div
              key={item[1].style}
              className="theme-item"
              onClick={() => {
                // item[1].highlight ? import (`highlight.js/styles/${item[1].highlight}.css`) :  import ('highlight.js/styles/atom-one-dark.css')
                onChangeTheme && onChangeTheme(item[1].style);
              }}
            >
              {item[0] || '测试'}
            </div>
          );
        })}
      </div>
    );
  };
  const titleMenu = (list: any[]) => {
    return (
      <div className="theme-list" style={{height: 200}}>
        {list.map((item) => {
          return (
            <div
              key={item.value}
              className="theme-item"
              onClick={() => {
                let inputValue = '';
                if (ref) {
                  inputValue = setTitle(
                    ref,
                    value,
                    item.value,
                    item.label
                  );
                  onChange && onChange(inputValue);
                } else {
                  onChange && onChange('**默认文字**');
                }
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };
  const RenderToolBar = (item: { placeholder: string; icon: JSX.Element; type: string; symbol: string; list?: undefined; } | { placeholder: string; icon: JSX.Element; type: string; symbol?: undefined; list?: undefined; } | { placeholder: string; icon: JSX.Element; type: string; list: any; symbol?: undefined; }) => {
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
      case 'title':
        return (
          <Dropdown
            overlay={() => {
              return titleMenu(item?.list);
            }}
            placement="bottomLeft"
            arrow
          >
            {item.icon}
          </Dropdown>
        );
        case 'table':
        return (
          <Tooltip title={item.placeholder}>
            <span
              onClick={() => {
                // handleClick(item);
                const inputValue = value+'|  表头   | 表头  |\n' +
                  '|  ----  | ----  |\n' +
                  '| 单元格  | 单元格 |\n' +
                  '| 单元格  | 单元格 |'
                onChange && onChange(inputValue);
              }}
            >
              {item.icon}
            </span>
          </Tooltip>
        );
        case 'code':
        return (
          <Tooltip title={item.placeholder}>
            <span
              onClick={() => {
                const inputValue = value+'``'
                onChange && onChange(inputValue);
              }}
            >
              {item.icon}
            </span>
          </Tooltip>
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
