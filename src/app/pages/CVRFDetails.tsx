import { AppLayout } from '@app/AppLayout/AppLayout';
import { Severity } from '@app/components';
import { IfLoaded } from '@app/components/IfLoaded';
import { useCVRF } from '@app/hooks/useCVRF';
import { format } from 'date-fns';
import * as React from 'react';
import { useParams } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import {
  BreadcrumbItem, PageSection, Breadcrumb, TextContent, Title, Text, TextList, TextVariants, TextListItem, Tabs, Tab,
} from '@patternfly/react-core';

export const CVRFDetails: React.FunctionComponent = () => {
  const { RHSA_id } = useParams<{ RHSA_id: string }>();
  const { data: CVRF, loading } = useCVRF(RHSA_id);
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (_, tabIndex: number | string) => setActiveTabKey(parseInt('' + tabIndex, 10));
  return (
    <DocumentTitle title={RHSA_id}>
      <AppLayout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={'/cvrf'}>CVRF</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isActive={true}>{RHSA_id}</BreadcrumbItem>
          </Breadcrumb>
        }
      >
        <IfLoaded loading={loading}>
          {() => (
            <>
              <PageSection variant={'light'}>
                <TextContent>
                  <Title size={'3xl'}>{RHSA_id} - {CVRF.document_title}</Title>
                  <Text component={TextVariants.p}>
                    Severity: <Severity severity={CVRF.aggregate_severity}/><br/>
                    Issued: {format(new Date(CVRF.document_tracking.initial_release_date), 'PPpp')}<br/>
                    Updated: {format(new Date(CVRF.document_tracking.current_release_date), 'PPpp')}<br/>
                  </Text>
                </TextContent>
              </PageSection>

              <PageSection variant={'light'}>
                <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                  <Tab eventKey={0} title="Overview">
                    <TextContent>
                      {CVRF.document_notes.note.map((n, idx) =>
                        <Text component={TextVariants.p} key={idx}
                              dangerouslySetInnerHTML={{__html: n.replace(/(\r\n|\n|\r)/gm, '<br />')}}/>
                      )}
                    </TextContent>
                  </Tab>

                  <Tab eventKey={1} title="Affected Products">
                    <TextContent>
                      <TextList>
                        {CVRF.product_tree && CVRF.product_tree.branch.map((b, idx) =>
                          <TextListItem key={idx}>
                            {b.name}
                            {b.branch && (
                              <TextList>
                                {b.branch.map((bb, jdx) => (
                                  <TextListItem key={jdx}>{bb.name}</TextListItem>
                                ))}
                              </TextList>
                            )}
                          </TextListItem>
                        )}
                      </TextList>
                    </TextContent>
                  </Tab>

                  <Tab eventKey={2} title="Vulnerabilities">
                    <TextContent>
                      <TextList>
                        {CVRF.vulnerability && CVRF.vulnerability.map((v, idx) =>
                          <TextListItem key={idx}>
                            <a>{v.cve}</a><br />
                            <p>{v.notes.note}</p>
                          </TextListItem>
                        )}
                      </TextList>
                    </TextContent>
                  </Tab>
                </Tabs>
              </PageSection>
            </>
          )}
        </IfLoaded>
      </AppLayout>
    </DocumentTitle>
  );
};
