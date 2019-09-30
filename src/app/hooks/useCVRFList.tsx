import { ICVRFListItem } from '@app/models';
import * as React from 'react';
import { useAbortableFetch } from '@app/hooks';

export function useCVRFList({ perPage = 10, page = 1 } = {}) {
  return useAbortableFetch<ICVRFListItem[]>(
    `https://corsify.appspot.com/${encodeURIComponent(
      `https://access.redhat.com/labs/securitydataapi/cvrf.json?per_page=${perPage}&page=${page}`
    )}`
  );
}
