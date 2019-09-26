import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@app/routes';
import DocumentTitle from 'react-document-title';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  return (
    <DocumentTitle title="Patternfly React Seed | App Title">
      <Router>
        <AppRoutes />
      </Router>
    </DocumentTitle>
  );
};

export { App };
