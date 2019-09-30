import { ICVRF } from '@app/models';
import * as React from 'react';
import { useAbortableFetch } from '@app/hooks';

const responseToData = async (response: Response) => {
  if (response && response.ok) {
    const data = await response.json();
    return data.cvrfdoc;
  }
};

export function useCVRF(RHSA_id: string) {
  return useAbortableFetch<ICVRF>(
    `https://corsify.appspot.com/${encodeURIComponent(
      `https://access.redhat.com/labs/securitydataapi/cvrf/${RHSA_id}.json`
    )}`, { responseToData }
  );
}
