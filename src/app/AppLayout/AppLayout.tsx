import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  NavVariants,
  Page,
  PageHeader,
  SkipToContent
} from '@patternfly/react-core';
import { routes } from '@app/routes';

interface IAppLayout {
  breadcrumb?: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ breadcrumb, children }) => {
  const history = useHistory();
  const logoProps = {
    onClick: () => history.push('/')
  };

  const Navigation = (
    <Nav id="nav-primary-simple">
      <NavList id="nav-list-simple" variant={NavVariants.horizontal}>
        {routes.map((route, idx) => {
          return (
            <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
              <NavLink exact={true} to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );

  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );

  const Header = (
    <PageHeader
      logo="Patternfly"
      logoProps={logoProps}
      topNav={Navigation}
    />
  );

  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      breadcrumb={breadcrumb}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
