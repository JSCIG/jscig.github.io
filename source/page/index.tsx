import { createCell, Fragment } from 'web-cell';
import { Route, CellRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLinkProps, NavLink } from 'boot-cell/source/Navigator/Nav';

import { history } from '../model';
import { MainPage } from './Main';
import { ProposalPage } from './Proposal';

const menu: NavLinkProps[] = [
    { title: '标准提案', href: 'proposals' },
    {
      title: '中文讨论',
      target: '_blank',
      href: 'https://github.com/JSCIG/es-discuss/issues'
    },
    { title: '技术委员会', target: '_blank', href: 'https://tc39.es/' },
    {
      title: '正式标准',
      target: '_blank',
      href:
        'https://www.ecma-international.org/publications/standards/Ecma-262.htm'
    },
    {
      title: '兼容表格',
      target: '_blank',
      href: 'https://kangax.github.io/compat-table/es6/'
    },
    { title: 'ES 6 学习', target: '_blank', href: 'http://es6-features.org/' },
    {
      title: '开源代码',
      target: '_blank',
      href: 'https://github.com/JSCIG/jscig.github.io'
    }
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
      >
        {menu.map(({ title, ...props }) => (
          <NavLink {...props}>{title}</NavLink>
        ))}
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
