import { FC } from 'web-cell';
import { createRouter } from 'cell-router';
import {
  Container,
  OffcanvasNavbar,
  NavLink,
  NavDropdown,
  DropdownItem,
} from 'boot-cell';

import { topMenu } from '../data/navigator-menu';
import { MainPage } from './Main';
import { ProposalPage } from './Proposal';
import { OrganizationPage } from './Organization';

const { Route } = createRouter();

export const PageFrame: FC = () => (
  <>
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
      {topMenu.map(({ title, menu, target, href }) =>
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

    <Container>
      <Route path="" component={MainPage} />
      <Route path="proposals" component={ProposalPage} />
      <Route path="members" component={OrganizationPage} />
    </Container>

    <footer className="text-center bg-light py-5">
      <img
        style={{ width: '2rem', margin: '0 0.25rem' }}
        alt="WebCell logo"
        src="https://github.com/EasyWebApp.png"
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
  </>
);
