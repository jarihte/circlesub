/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useSession, signIn, signOut } from 'next-auth/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import PageLink from './PageLink';
import AnchorLink from './AnchorLink';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              <NavItem style={{ paddingTop: '5px' }}>
                <PageLink href="https://circlesub.com" className="nav-link" testId="navbar-home" icon={null} tabIndex={undefined}>
                  <img src="/circlesub-icon.png" alt="logo" height="50px" />
                </PageLink>
              </NavItem>
              <NavItem style={{ paddingTop: '18px' }}>
                <PageLink href="/" className="nav-link" testId="navbar-home" icon={null} tabIndex={undefined}>
                  Home
                </PageLink>
              </NavItem>
              <NavItem style={{ paddingTop: '18px' }}>
                <PageLink href="https://github.com/bevanhunt/circlesub" className="nav-link" testId="navbar-home" icon={null} tabIndex={undefined}>
                  GitHub
                </PageLink>
              </NavItem>
              {status === 'authenticated' && session && (
                <NavItem style={{ paddingTop: '18px' }}>
                  <PageLink href="/setup" className="nav-link" testId="navbar-external" icon={null} tabIndex={undefined}>
                    Setup
                  </PageLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {status !== 'authenticated' && (
                <NavItem id="qsLoginBtn">
                  <AnchorLink
                    icon={null}
                    className="btn btn-secondary btn-margin"
                    tabIndex={0}
                    testId="navbar-login-desktop"
                    onClick={() => signIn('twitch')}
                  >
                    <div className="d-flex flex-wrap">
                      <div className="ml-auto" style={{ paddingRight: '40px' }}>
                        <FontAwesomeIcon icon={faTwitch} />
                      </div>
                      <div className="mr-auto">
                        Login
                      </div>
                    </div>
                  </AnchorLink>
                </NavItem>
              )}
              {status === 'authenticated' && session && (
                <UncontrolledDropdown nav inNavbar data-testid="navbar-menu-desktop">
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={session.user?.image || ''}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                      height="50"
                      data-testid="navbar-picture-desktop"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header data-testid="navbar-user-desktop">
                      {session.user?.name}
                    </DropdownItem>
                    <DropdownItem header>
                      <PageLink href="/setup" className="" testId="test" icon={null} tabIndex={undefined}>
                        Setup
                      </PageLink>
                    </DropdownItem>
                    <DropdownItem header>
                      <PageLink href={`/tip/${session.user?.name}`} className="" testId="test" icon={null} tabIndex={undefined}>
                        Tip Page
                      </PageLink>
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn">
                      <AnchorLink icon="power-off" testId="navbar-logout-desktop" onClick={() => signOut()} className={undefined} tabIndex={undefined}>
                        Log out
                      </AnchorLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {status !== 'authenticated' && (
              <Nav className="d-md-none" navbar>
                <AnchorLink
                  icon={null}
                  className="btn btn-secondary btn-block"
                  tabIndex={0}
                  testId="navbar-login-mobile"
                  onClick={() => signIn('twitch')}
                >
                  <div className="d-flex flex-wrap">
                    <div className="ml-auto" style={{ paddingRight: '40px' }}>
                      <FontAwesomeIcon icon={faTwitch} />
                    </div>
                    <div className="mr-auto">
                      Login
                    </div>
                  </div>
                </AnchorLink>
              </Nav>
            )}
            {status === 'authenticated' && session && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile"
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={session.user?.image || ''}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                      height="50"
                      data-testid="navbar-picture-mobile"
                    />
                    <h6 className="d-inline-block" data-testid="navbar-user-mobile">
                      <div>
                        {session.user?.name}
                      </div>
                    </h6>
                  </span>
                </NavItem>
                <NavItem>
                  <PageLink href="/setup" className="nav-link" testId="navbar-external" icon={null} tabIndex={undefined}>
                    Setup
                  </PageLink>
                </NavItem>
                <NavItem>
                  <PageLink href={`/tip/${session.user?.name}`} className="nav-link" testId="navbar-external" icon={null} tabIndex={undefined}>
                    Tip Page
                  </PageLink>
                </NavItem>
                <NavItem id="qsLogoutBtn">
                  <AnchorLink
                    tabIndex={undefined}
                    className="btn btn-link p-0"
                    icon="power-off"
                    testId="navbar-logout-mobile"
                    onClick={() => signOut()}
                  >
                    Log out
                  </AnchorLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
