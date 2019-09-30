import { PageSection } from '@patternfly/react-core';
import * as React from 'react';

export interface IIfLoadedProps {
  loading: boolean;
  loader?: React.ReactElement;
  children: () => React.ReactElement;
}

export const IfLoaded: React.FunctionComponent<IIfLoadedProps> = ({
  loading,
  loader = <PageSection variant={'light'}>Loading...</PageSection>,
  children
}) => (
  loading
    ? loader
    : children()
);

