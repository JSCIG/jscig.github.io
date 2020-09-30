import { createCell, Fragment } from 'web-cell';
import { Route, CellRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLinkProps, NavLink } from 'boot-cell/source/Navigator/Nav';
import {
  DropMenuItemProps,
  DropMenuItem
} from 'boot-cell/source/Navigator/DropMenu';

import { history } from '../model';
import { MainPage } from './Main';
import { ProposalPage } from './Proposal';

interface NavMenu extends NavLinkProps {
  menu?: DropMenuItemProps[];
}

const menu: NavMenu[] = [
    { title: '标准提案', href: 'proposals' },
    {
      title: '中文讨论',
      target: '_blank',
      href: 'https://github.com/JSCIG/es-discuss/issues'
    },
    { title: '开放组织', target: '_blank', href: 'https://github.com/JSCIG' },
    {
      title: '正式标准',
      menu: [
        {
          title: 'ECMAScript 语言',
          target: '_blank',
          href:
            'https://tc39.es/ecma262/'
        },
        {
          title: 'ECMAScript 国际化 API',
          target: '_blank',
          href:
            'https://tc39.es/ecma402/'
        }
      ]
    },
    {
      title: '兼容表格',
      target: '_blank',
      href: 'https://kangax.github.io/compat-table/es6/'
    },
    { title: 'ES 6 学习', target: '_blank', href: 'http://es6-features.org/' },
    { title: '技术委员会', target: '_blank', href: 'https://tc39.es/' }
  ],
  routes: Route[] = [
    { paths: [''], component: MainPage },
    { paths: ['proposals'], component: ProposalPage }
  ];

export function PageFrame() {
  return (
    <>
      <NavBar
        narrow
        brand={
          <>
            <img
              alt="JavaScript 中文兴趣组"
              src="https://github.com/JSCIG.png"
              style={{ width: '2rem', marginRight: '0.5rem' }}
            />
            JavaScript 中文兴趣组
          </>
        }
        menuAlign="end"
      >
        {menu.map(({ title, menu, ...props }) =>
          !menu ? (
            <NavLink {...props}>{title}</NavLink>
          ) : (
            <NavLink title={title}>
              {menu.map(({ title, ...rest }) => (
                <DropMenuItem {...rest}>{title}</DropMenuItem>
              ))}
            </NavLink>
          )
        )}
      </NavBar>

      <CellRouter
        className="container"
        style={{ minHeight: '60vh' }}
        history={history}
        routes={routes}
      />
      <footer className="text-center bg-light py-5">
        自豪地用
        <a className="mx-1" target="_blank" href="https://web-cell.dev/">
          WebCell v2
        </a>
        和
        <a
          className="mx-1"
          target="_blank"
          href="https://web-cell.dev/BootCell/"
        >
          BootCell v1
        </a>
        开发
      </footer>
    </>
  );
}
