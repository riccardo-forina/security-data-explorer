import { AppLayout } from '@app/AppLayout/AppLayout';
import { Calendar, Severity } from '@app/components';
import { IfLoaded } from '@app/components/IfLoaded';
import { useCVRFList } from '@app/hooks';
import {
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  List,
  ListItem,
  PageSection,
  Pagination,
  Text,
  TextContent,
  TextVariants,
  Title
} from '@patternfly/react-core';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const CVRFList: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '', 10) || 1;
  const perPage = parseInt(searchParams.get('per_page') || '', 10) || 10;
  const { data: CVRFs, loading, error } = useCVRFList({ page, perPage });

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
    <AppLayout>
      <PageSection variant={"light"}>
        <TextContent>
          <Title size={'3xl'}>List of recent Common Vulnerability Reporting Framework (CVRF)</Title>
        </TextContent>
      </PageSection>
      <PageSection variant={"light"}>
        <Pagination
          itemCount={page * perPage + perPage}
          page={page}
          perPage={perPage}
          onSetPage={onSetPage}
          onPerPageSelect={onPerPageSelect}
          variant={'top'}
        />
          <IfLoaded loading={loading}>
            {() => (
              <DataList aria-label="List of CVRFs">
                {CVRFs.map(CVRF => {
                  const itemId = `CVRF-item-${CVRF.RHSA}`;
                  return (
                    <DataListItem aria-labelledby={itemId} key={itemId}>
                      <DataListItemRow>
                        <DataListItemCells
                          dataListCells={[
                            <DataListCell key="date" isFilled={false}>
                              <Calendar date={CVRF.released_on} />
                            </DataListCell>,
                            <DataListCell key="details" isFilled={true}>
                              <TextContent>
                                <Text component={TextVariants.h2} id={itemId}>
                                  <Link to={`/cvrf/${CVRF.RHSA}`}>{CVRF.RHSA}</Link>
                                </Text>

                                Severity: <Severity severity={CVRF.severity} />

                                <Text component={TextVariants.h3} id={itemId}>
                                  <strong>{CVRF.released_packages.length}</strong> released packages
                                </Text>

                                <List variant={'inline'}>
                                  {CVRF.released_packages.map((rp, idx) => (
                                    <ListItem key={idx}>
                                      {rp}
                                    </ListItem>
                                  ))}
                                </List>

                                <Text component={TextVariants.h3} id={itemId}>
                                  <strong>{CVRF.CVEs.length}</strong> related CVEs
                                </Text>

                                <List variant={'inline'}>
                                  {CVRF.CVEs.map((cve, idx) => (
                                    <ListItem key={idx}>
                                      <a>{cve}</a>
                                    </ListItem>
                                  ))}
                                </List>
                              </TextContent>
                            </DataListCell>,
                          ]}
                        />
                      </DataListItemRow>
                    </DataListItem>
                  );
                })}
              </DataList>
            )}
          </IfLoaded>
        </PageSection>
    </AppLayout>
  );
};
