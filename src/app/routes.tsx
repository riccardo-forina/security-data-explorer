import * as React from 'react';
import { useLocation } from 'react-router';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
import { Alert, PageSection } from '@patternfly/react-core';
import { DynamicImport } from '@app/DynamicImport';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { NotFound } from '@app/NotFound/NotFound';
import DocumentTitle from 'react-document-title';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

const getCVRFListAsync = async () => {
  const module = await import(/* webpackChunkName: 'CVRFList' */ '@app/pages/CVRFList');
  return module.CVRFList;
};

const getCVRFDetailsAsync = async () => {
  const module = await import(/* webpackChunkName: 'CVRFDetails' */ '@app/pages/CVRFDetails');
  return module.CVRFDetails;
};

const AsyncComponent: React.FunctionComponent<{ getComponent: () => Promise<React.ComponentType> }> = ({ getComponent }) => {
  const lastNavigation = useLastLocation();
  return (
    <DynamicImport load={getComponent} focusContentAfterMount={lastNavigation !== null}>
      {(Component: any) => {
        let loadedComponent: any;
        if (Component === null) {
          loadedComponent = (
            <PageSection aria-label="Loading Content Container">
              <div className="pf-l-bullseye">
                <Alert title="Loading" className="pf-l-bullseye__item" />
              </div>
            </PageSection>
          );
        } else {
          loadedComponent = <Component />;
        }
        return loadedComponent;
      }}
    </DynamicImport>
  );
};

const RouteWithTitleUpdates = ({ isAsync = false, title, children, ...rest }) => {
  const location = useLocation();
  const lastNavigation = useLastLocation();

  React.useEffect(() => {
    let routeFocusTimer;
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      if (routeFocusTimer) {
        clearTimeout(routeFocusTimer);
      }
    };
  }, []);

  return (
    <Route {...rest}>
      <DocumentTitle title={title} key={location.key}>
        {children}
      </DocumentTitle>
    </Route>
  );
};

export interface IAppRoute {
  label: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  icon: any;
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
}
const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      <Redirect from='/' to='/cvrf' exact={true} />
      <RouteWithTitleUpdates
        path={'/cvrf'}
        exact={true}
        title={'List of CVRF'}
        isAsync={true}
      >
        <AsyncComponent getComponent={getCVRFListAsync} />
      </RouteWithTitleUpdates>
      <RouteWithTitleUpdates
        path={'/cvrf/:RHSA_id'}
        exact={true}
        title={'RHSA Details'}
        isAsync={true}
      >
        <AsyncComponent getComponent={getCVRFDetailsAsync} />
      </RouteWithTitleUpdates>
      <RouteWithTitleUpdates title={'404 Page Not Found'}>
        <NotFound />>
      </RouteWithTitleUpdates>
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes };
