import { createCell, Fragment } from 'web-cell';
import { CellRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';

import { history } from '../model';

const menu = [
  {
    title: 'GitHub source',
    href: 'https://github.com/JSCIG/jscig.github.io'
  }
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
        routes={[]}
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
