import { observable, reaction } from 'mobx';

import { service } from './service';

export interface Proposal {
  stage: number;
  name: string;
  link: string;
  authors?: string[];
  champions?: string[];
  meeting?: string;
  tests?: string;
  updated_at?: string;
  published_at?: string;
  pushed_at?: string;
  repo?: string;
  owner?: string;
  archived?: boolean;
  forks_count?: number;
  open_issues_count?: number;
  stargazers_count?: number;
  subscribers_count?: number;
  watchers_count?: number;
}

export type ProposalSortKey =
  | 'stage'
  | 'name'
  | 'stargazers_count'
  | 'open_issues_count'
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

    const { body } = await service.get<Proposal[]>(
      'dataset/proposals.min.json'
    );
    this.loading = false;

    return (this.list = body);
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
