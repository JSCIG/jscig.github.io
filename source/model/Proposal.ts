import { observable, reaction } from 'mobx';
import { ReposListForOrgResponseData } from '@octokit/types';

import { github } from './service';
import proposals from '../data/proposals.json';

const pages = Array.from(
  new Array(Math.ceil(proposals.length / 100)),
  (_, index) => ++index
);

async function fetchRepositories() {
  const list: ReposListForOrgResponseData = [];

  for (const page of pages) {
    const { data } = await github.repos.listForOrg({
      org: 'tc39',
      type: 'public',
      per_page: 100,
      page
    });

    list.push(...data);
  }

  return list;
}

export interface Proposal {
  stage: number;
  name: string;
  link: string;
  authors: string[];
  champions: string[];
  meeting_link?: string;
  updated_at?: string;
  published_at?: string;
  star_count: number;
  issue_count: number;
}

export type ProposalSortKey =
  | 'stage'
  | 'name'
  | 'star_count'
  | 'issue_count'
  | 'updated_at'
  | 'published_at';

export class ProposalModel {
  @observable
  loading = false;

  @observable
  list: Proposal[] = [];

  @observable
  sortKey: ProposalSortKey;

  constructor() {
    reaction(
      () => this.sortKey,
      key => this.sortBy(key)
    );
  }

  async getList() {
    this.loading = true;

    const repositories = await fetchRepositories();

    this.list = proposals.map(({ link, ...rest }) => {
      const { stargazers_count: star_count, open_issues_count: issue_count } =
        repositories.find(({ html_url }) => html_url === link) || {};

      return { ...rest, link, star_count, issue_count } as Proposal;
    });

    this.loading = false;

    return this.list;
  }

  sortBy(key: ProposalSortKey) {
    return (this.list = this.list.sort(
      ({ [key]: A = '' }, { [key]: B = '' }) => {
        switch (typeof B) {
          case 'number':
            return B - (A as number);
          case 'string':
            return B.localeCompare(A as string);
          default:
            return key.endsWith('_at') ? +new Date(B) - +new Date(A) : 0;
        }
      }
    ));
  }
}
