import { type CaseStudy } from './types';
import { SEACAVE } from './seacave';
import { ANDYS } from './andys';
import { BULLFROG } from './bullfrog';
import { PRESQUEISLE } from './presqueisle';

/* Client work — four live sites, all built and shipped by me. One file per
   study, so four of them can be rewritten at the same time. */

export const CLIENT_CASE_STUDIES: readonly CaseStudy[] = [
  SEACAVE,
  ANDYS,
  BULLFROG,
  PRESQUEISLE,
];
