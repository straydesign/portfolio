import { CLIENT_CASE_STUDIES } from './clients';
import { MIDDLEMAN } from './middleman';
import { type CaseStudy } from './types';

export * from './types';
export * from './shots';
export { CLIENT_CASE_STUDIES } from './clients';

export const CASE_STUDIES: readonly CaseStudy[] = [...CLIENT_CASE_STUDIES, MIDDLEMAN];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);
