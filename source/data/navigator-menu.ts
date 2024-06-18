import { NavLinkProps } from 'boot-cell';
import { WebCellProps } from 'web-cell';

export interface NavMenu extends NavLinkProps {
  menu?: WebCellProps<HTMLAnchorElement>[];
}

export const topMenu: NavMenu[] = [
  { title: '标准提案', href: 'proposals' },
  {
    title: '中文讨论',
    target: '_blank',
    href: 'https://github.com/JSCIG/es-discuss/discussions',
  },
  { title: '开放组织', target: '_blank', href: 'https://github.com/JSCIG' },
  {
    title: '正式标准',
    menu: [
      {
        title: 'ECMAScript 语言',
        target: '_blank',
        href: 'https://tc39.es/ecma262/',
      },
      {
        title: 'ECMAScript 国际化 API',
        target: '_blank',
        href: 'https://tc39.es/ecma402/',
      },
      {
        title: 'JSON 数据交换语法',
        target: '_blank',
        href: 'https://ecma-international.org/publications-and-standards/standards/ecma-404/',
      },
      {
        title: 'ECMAScript 规范套件',
        target: '_blank',
        href: 'https://ecma-international.org/publications-and-standards/standards/ecma-414/',
      },
    ],
  },
  {
    title: '兼容表格',
    target: '_blank',
    href: 'https://compat-table.github.io/compat-table/es6/',
  },
  { title: 'ES 6 学习', target: '_blank', href: 'http://es6-features.org/' },
  { title: '技术委员会', target: '_blank', href: 'https://tc39.es/' },
  {
    title: '标准补丁',
    menu: [
      {
        title: '客户端自动加载',
        target: '_blank',
        href: 'https://polyfill.web-cell.dev/',
      },
      {
        title: '服务端自动加载',
        target: '_blank',
        href: 'https://polyfiller.kaiyuanshe.cn/',
      },
    ],
  },
];
