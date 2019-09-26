import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  PageSection,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  TextContent,
  Text,
  TextVariants,
  List,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
  Pagination
} from '@patternfly/react-core';
import { Calendar, Severity } from '@app/components';
import { useCVRFList } from '@app/hooks';
import { AppLayout } from '@app/AppLayout/AppLayout';

export const CVRFList: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '', 10) || 1;
  const perPage = parseInt(searchParams.get('per_page') || '', 10) || 10;
  const { CVRFs, loading, error } = useCVRFList({ page, perPage });

  const onSetPage = (_, page: number) => {
    searchParams.set('page', page.toString());
    history.push({
      search: searchParams.toString()
    })
  };

  const onPerPageSelect = (_, perPage: number) => {
    searchParams.set('per_page', perPage.toString());
    history.push({
      search: searchParams.toString()
    })
  };

  return (
    <AppLayout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbItem>Section Home</BreadcrumbItem>
          <BreadcrumbItem to="#">Section Title</BreadcrumbItem>
          <BreadcrumbItem to="#">Section Title</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            Section Landing
          </BreadcrumbItem>
        </Breadcrumb>
      }
    >
      <PageSection variant={"light"}>
        <Pagination
          itemCount={1000}
          page={page}
          perPage={perPage}
          onSetPage={onSetPage}
          onPerPageSelect={onPerPageSelect}
          variant={"top"}
        />
        <DataList aria-label="List of CVRFs">
          {CVRFs.map((cvrf, idx) => {
            const itemId = `CVRF-item-${idx}`;
            return (
              <DataListItem aria-labelledby={itemId} key={itemId}>
                <DataListItemRow>
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell key="date" isFilled={false}>
                        <Calendar date={cvrf.released_on} />
                      </DataListCell>,
                      <DataListCell key="details" isFilled={true}>
                        <TextContent>
                          <Text component={TextVariants.h2} id={itemId}>
                            <a>{cvrf.RHSA}</a>
                          </Text>
                          Severity: <Severity severity={cvrf.severity} />
                          <Text component={TextVariants.h3} id={itemId}>
                            List of related CVEs
                          </Text>
                        </TextContent>
                        <List variant={'inline'}>
                          {cvrf.CVEs.map((cve, idx) => (
                            <ListItem key={idx}>
                              <a>{cve}</a>
                            </ListItem>
                          ))}
                          {cvrf.CVEs.length === 0 && 'None.'}
                        </List>
                      </DataListCell>,
                    ]}
                  />
                </DataListItemRow>
              </DataListItem>
            );
          })}
        </DataList>
        {loading && 'Loading...'}
      </PageSection>
    </AppLayout>
  );
};
