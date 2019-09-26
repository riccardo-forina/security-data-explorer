import * as React from 'react';
import { useAbortableFetch } from '@app/hooks';

export interface ICVRF {
  released_on: string;
  severity: string;
  RHSA: string;
  CVEs: string[];
}

export function useCVRFList({ perPage = 10, page = 1 } = {}) {
  const [CVRFs, setCVRFs] = React.useState<ICVRF[]>([]);
  const { response, ...rest } = useAbortableFetch(
    `https://corsify.appspot.com/${encodeURIComponent(
      `https://access.redhat.com/labs/securitydataapi/cvrf.json?per_page=${perPage}&page=${page}`
    )}`
  );

  React.useEffect(() => {
    (async () => {
      if (response && response.ok) {
        const data = await response.json();
        setCVRFs(data);
      } else {
        setCVRFs([]);
      }
    })();
  }, [response, setCVRFs]);

  return { response, CVRFs, ...rest };
}