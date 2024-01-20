import { FC, WebCellProps } from 'web-cell';
import { createRouter } from 'cell-router';
import {
  OffcanvasNavbar,
  NavLinkProps,
  NavLink,
  NavDropdown,
  DropdownItem,
} from 'boot-cell';

import { MainPage } from './Main';
import { ProposalPage } from './Proposal';
import { OrganizationPage } from './Organization';

const { Route } = createRouter();

interface NavMenu extends NavLinkProps {
  menu?: WebCellProps<HTMLAnchorElement>[];
}

const menu: NavMenu[] = [
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

export const PageFrame: FC = () => (
  <div className="d-flex flex-column" style={{ height: '200vh' }}>
    <OffcanvasNavbar
      sticky="top"
      expand="md"
      variant="dark"
      brand={
        <a className="text-light text-decoration-none" href="#">
          <img
            alt="JavaScript 中文兴趣组"
            src="https://github.com/JSCIG.png"
            style={{ width: '2rem', marginRight: '0.5rem' }}
          />
          JavaScript 中文兴趣组
        </a>
      }
    >
      {menu.map(({ title, menu, target, href }) =>
        !menu ? (
          <NavLink
            className="m-3 my-md-0 mx-md-3"
            key={href}
            target={target}
            href={href?.startsWith('http') ? href : `#${href}`}
          >
            {title}
          </NavLink>
        ) : (
          <NavDropdown className="mx-3" key={title} title={title}>
            {menu.map(({ target, href, title }) => (
              <DropdownItem {...{ target, href }}>{title}</DropdownItem>
            ))}
          </NavDropdown>
        ),
      )}
    </OffcanvasNavbar>

    <div className="container flex-fill overflow-auto scrollbar-none">
      <Route path="" component={MainPage} />
      <Route path="proposals" component={ProposalPage} />
      <Route path="members" component={OrganizationPage} />
    </div>

    <footer className="text-center bg-light py-5">
      <img
        style={{ width: '2rem', margin: '0 0.25rem' }}
        alt="WebCell logo"
        src="https://web-cell.dev/WebCell-0.f1ffd28b.png"
      />
      自豪地用
      <a className="mx-1" target="_blank" href="https://web-cell.dev/">
        WebCell v3
      </a>
      和
      <a className="mx-1" target="_blank" href="https://web-cell.dev/BootCell/">
        BootCell v2
      </a>
      开发
    </footer>
  </div>
);
