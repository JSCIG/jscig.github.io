import { observable } from 'mobx';
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

export class ProposalModel {
  @observable
  list: Proposal[] = [];

  constructor() {
    this.boot();
  }

  async boot() {
    const repositories = await fetchRepositories();

    return (this.list = proposals.map(({ link, ...rest }) => {
      const { stargazers_count: star_count, open_issues_count: issue_count } =
        repositories.find(({ html_url }) => html_url === link) || {};

      return { ...rest, link, star_count, issue_count } as Proposal;
    }));
  }
}
